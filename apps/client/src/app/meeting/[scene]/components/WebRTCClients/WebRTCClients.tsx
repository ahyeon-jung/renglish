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

type WebRTCClientsProps = {
  sceneId: string;
}

export default function WebRTCClients({ sceneId }: WebRTCClientsProps) {
  const [connectionStatus, setConnectionStatus] = useState<string>("연결 중...");

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
  const roomId = sceneId;

  const candidateQueue = useRef<RTCIceCandidateInit[]>([]);
  const remoteDescSet = useRef(false);

  const createPeerConnection = () => {
    try {
      const pc = new RTCPeerConnection({
        iceServers: ICE_SERVERS
      });

      pc.onicecandidate = (event) => {
        if (event.candidate) {
          console.log('ICE candidate 발견:', event.candidate);
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

      pc.oniceconnectionstatechange = () => {
        console.log('ICE 연결 상태 변경:', pc.iceConnectionState);
        setConnectionStatus(`연결 상태: ${pc.iceConnectionState}`);
      };

      pc.ontrack = (event) => {
        console.log('원격 트랙 수신됨:', event.streams);
        if (remoteVideoRef.current && event.streams[0]) {
          console.log('원격 비디오에 스트림 설정');
          remoteVideoRef.current.srcObject = event.streams[0];
        }
      };

      pcRef.current = pc;
      return pc;
    } catch (err) {
      console.error('PeerConnection 생성 오류:', err);
      setConnectionStatus("연결 생성 실패");
      return null;
    }
  };

  const processIceCandidates = async () => {
    if (!pcRef.current || !remoteDescSet.current) return;

    console.log(`대기 중인 ICE 후보 ${candidateQueue.current.length}개 처리`);

    for (const candidate of candidateQueue.current) {
      try {
        await pcRef.current.addIceCandidate(new RTCIceCandidate(candidate));
        console.log('ICE 후보 추가됨');
      } catch (err) {
        console.error('ICE 후보 추가 실패:', err);
      }
    }

    candidateQueue.current = [];
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

      await processIceCandidates();
    } catch (err) {
      console.error('Offer 처리 오류:', err);
      setConnectionStatus("Offer 처리 실패");
    }
  };

  const handleAnswer = async (answer: RTCSessionDescriptionInit) => {
    if (!pcRef.current) return;

    try {
      console.log('원격 Answer 설정 중');
      await pcRef.current.setRemoteDescription(new RTCSessionDescription(answer));
      remoteDescSet.current = true;

      await processIceCandidates();
    } catch (err) {
      console.error('Answer 처리 오류:', err);
      setConnectionStatus("Answer 처리 실패");
    }
  };

  useEffect(() => {
    socketRef.current = io(SOCKET_URL, {
      transports: ['websocket'],
      reconnection: true,
    });

    const pc = createPeerConnection();

    startLocalStream().then(stream => {
      if (stream && pc) {
        stream.getTracks().forEach(track => pc.addTrack(track, stream));
      }
    });

    socketRef.current.on(SOCKET_EVENTS.CONNECT, () => {
      socketRef.current.emit('join', roomId);
    });

    socketRef.current.on(SOCKET_EVENTS.DISCONNECT, (error: any) => {
      toast.error('소켓 연결에 실패했습니다.')
    });

    socketRef.current.on(SOCKET_EVENTS.USER_JOINED, async ({ userId }: { userId: string }) => {
      toast(`${userId}가 입장했습니다.`)

      if (pc) {
        try {
          const offer = await pc.createOffer();
          await pc.setLocalDescription(offer);
          socketRef.current.emit('signal', {
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

    socketRef.current.on(SOCKET_EVENTS.ROOM_INFO, async ({ initiator }: { initiator: boolean }) => {
      console.log('[room-info] 시작자 여부:', initiator);
      setConnectionStatus(initiator ? "대기 중..." : "연결 중...");

      if (initiator && pc) {
        try {
          const offer = await pc.createOffer();
          await pc.setLocalDescription(offer);
          socketRef.current.emit('signal', {
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

    socketRef.current.on(SOCKET_EVENTS.SIGNAL, async ({ from, signal }: { from: string, signal: any }) => {
      console.log('시그널 수신:', signal.type);

      switch (signal.type) {
        case 'offer':
          await handleOffer(signal.offer);
          break;
        case 'answer':
          await handleAnswer(signal.answer);
          break;
        case 'ice-candidate':
          if (pcRef.current?.remoteDescription) {
            console.log('ICE 후보 즉시 추가');
            await pcRef.current.addIceCandidate(new RTCIceCandidate(signal.candidate));
          } else {
            console.log('ICE 후보 대기열에 추가 (remoteDescription 대기 중)');
            candidateQueue.current.push(signal.candidate);
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
      <div>{connectionStatus}</div>
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