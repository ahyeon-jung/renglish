"use client";

import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { SOCKET_EVENTS } from '@/constants/socket-event';
import { ENV } from '@/constants/env';
import LocalVideo from '../LocalVideo';
import { ICE_SERVERS } from '@/constants/ice-servers';
import RemoteVideo from '../RemoteVideo';
import clsx from 'clsx';
import { useLocalVideo } from '../../hooks/useLocalVideo';
import { toast } from 'react-toastify';

const SOCKET_URL = `${ENV.API_BASE_URL}/socket.io/chat`;
const SOCKET_OPTION = {
  transports: ['websocket'],
  reconnection: true,
};
const PEER_CONNECTION_OPTIONS = {
  iceServers: ICE_SERVERS
}

type WebRTCClientsProps = {
  sceneId: string;
}

export default function WebRTCClients({ sceneId: roomId }: WebRTCClientsProps) {
  const {
    localStream,
    videoEnabled,
    audioEnabled,
    toggleAudio,
    toggleVideo,
    pcRef,
    localVideoRef, startLocalStream,
  } = useLocalVideo();

  const socketRef = useRef<any>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);

  const remoteDescSet = useRef(false);

  const createPeerConnection = () => {
    try {
      const pc = new RTCPeerConnection(PEER_CONNECTION_OPTIONS);

      pc.onicecandidate = (event) => {
        if (event.candidate) {
          socketRef.current?.emit(SOCKET_EVENTS.SIGNAL, {
            roomId,
            from: socketRef.current.id,
            signal: {
              type: 'ice-candidate',
              candidate: event.candidate,
            },
          });
        }
      };

      pc.ontrack = (event) => {
        if (remoteVideoRef.current && event.streams[0]) {
          remoteVideoRef.current.srcObject = event.streams[0];
        }
      };

      pcRef.current = pc;
      return pc;
    } catch (err) {
      console.error('PeerConnection 생성 오류:', err);
      return null;
    }
  };

  const handleOffer = async (offer: RTCSessionDescriptionInit) => {
    if (!pcRef.current) return;

    try {
      await pcRef.current.setRemoteDescription(new RTCSessionDescription(offer));
      remoteDescSet.current = true;

      const answer = await pcRef.current.createAnswer();
      await pcRef.current.setLocalDescription(answer);

      socketRef.current.emit(SOCKET_EVENTS.SIGNAL, {
        roomId,
        from: socketRef.current.id,
        signal: {
          type: 'answer',
          answer,
        },
      });

    } catch (err) {
      console.error('Offer 처리 오류:', err);
    }
  };

  const handleAnswer = async (answer: RTCSessionDescriptionInit) => {
    if (!pcRef.current) return;

    try {
      await pcRef.current.setRemoteDescription(new RTCSessionDescription(answer));
      remoteDescSet.current = true;
    } catch (err) {
      console.error('Answer 처리 오류:', err);
    }
  };

  useEffect(() => {
    socketRef.current = io(SOCKET_URL, SOCKET_OPTION);

    const pc = createPeerConnection();

    startLocalStream().then(stream => {
      if (stream && pc) {
        stream.getTracks().forEach(track => pc.addTrack(track, stream));
      }
    });

    socketRef.current.on(SOCKET_EVENTS.CONNECT, () => {
      socketRef.current.emit(SOCKET_EVENTS.JOIN, roomId);
    });

    socketRef.current.on(SOCKET_EVENTS.DISCONNECT, () => {
      toast.error('소켓 연결에 실패했습니다.')
    });

    socketRef.current.on(SOCKET_EVENTS.USER_JOINED, async ({ userId }: { userId: string }) => {
      toast(`${userId}가 입장했습니다.`)

      if (pc) {
        try {
          const offer = await pc.createOffer();
          await pc.setLocalDescription(offer);
          socketRef.current.emit(SOCKET_EVENTS.SIGNAL, {
            roomId,
            from: socketRef.current.id,
            signal: {
              type: 'offer',
              offer,
            },
          });
        } catch (err) {
          console.error('Offer 생성 오류:', err);
        }
      }
    });

    socketRef.current.on(SOCKET_EVENTS.SIGNAL, async ({ signal }: { from: string, signal: any }) => {
      switch (signal.type) {
        case 'offer':
          await handleOffer(signal.offer);
          break;
        case 'answer':
          await handleAnswer(signal.answer);
          break;
        case 'ice-candidate':
          if (pcRef.current?.remoteDescription) {
            await pcRef.current.addIceCandidate(new RTCIceCandidate(signal.candidate));
          }
          break;
      }
    });

    socketRef.current.on(SOCKET_EVENTS.USER_LEFT, ({ userId }: { userId: string }) => {
      toast(`${userId}(이)가 나갔습니다.`)

      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = null;
      }
    });

    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }

      if (pcRef.current) {
        pcRef.current.close();
      }

      socketRef.current?.disconnect();
    };
  }, []);

  return (
    <div className={clsx(
      "p-2 fixed top-[var(--header-height)] right-0",
      "flex flex-col flex-wrap gap-4 bg-gray-300"
    )}>
      <LocalVideo
        stream={localStream}
        isVideoEnabled={videoEnabled}
        isAudioEnabled={audioEnabled}
        videoRef={localVideoRef as React.RefObject<HTMLVideoElement>}
        toggleVideo={toggleVideo}
        toggleAudio={toggleAudio}
      />
      <RemoteVideo videoRef={remoteVideoRef as React.RefObject<HTMLVideoElement>} />
    </div>
  );
};