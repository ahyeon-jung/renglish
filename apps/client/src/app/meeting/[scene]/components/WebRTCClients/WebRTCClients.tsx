"use client";

import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { SOCKET_EVENTS } from '@/constants/socket-event';
import { ENV } from '@/constants/env';

const SOCKET_URL = `${ENV.API_BASE_URL}/socket.io/chat`;

type WebRTCClientsProps = {
  sceneId: string;
}

export default function WebRTCClients({ sceneId }: WebRTCClientsProps) {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<string>("연결 중...");

  const socketRef = useRef<any>(null);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const roomId = sceneId;

  const candidateQueue = useRef<RTCIceCandidateInit[]>([]);
  const remoteDescSet = useRef(false);
  const pcRef = useRef<RTCPeerConnection | null>(null);

  const startLocalStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });

      setLocalStream(stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }


      if (pcRef.current) {
        stream.getTracks().forEach((track) => {
          if (localStream) pcRef.current?.addTrack(track, stream);
        });
      }

      return stream;
    } catch (err) {
      console.error('미디어 디바이스 접근 오류:', err);
      setConnectionStatus("카메라/마이크 접근 실패");
      return null;
    }
  };

  const createPeerConnection = () => {
    try {
      const pc = new RTCPeerConnection({
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:stun1.l.google.com:19302' },
          {
            urls: 'turn:openrelay.metered.ca:80',
            username: 'openrelayproject',
            credential: 'openrelayproject'
          },
          {
            urls: 'turn:openrelay.metered.ca:443',
            username: 'openrelayproject',
            credential: 'openrelayproject'
          },

          {
            urls: 'turn:numb.viagenie.ca',
            username: 'webrtc@live.com',
            credential: 'muazkh'
          },
          {
            urls: 'turn:192.158.29.39:3478?transport=udp',
            username: '28224511:1379330808',
            credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA='
          },
          {
            urls: 'turn:192.158.29.39:3478?transport=tcp',
            username: '28224511:1379330808',
            credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA='
          }
        ],
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
      console.log('원격 Offer 설정 중');
      await pcRef.current.setRemoteDescription(new RTCSessionDescription(offer));
      remoteDescSet.current = true;

      console.log('Answer 생성 중');
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
      console.log('[socket] 연결됨:', socketRef.current.id);
      setConnectionStatus("소켓 연결됨");
      socketRef.current.emit('join', roomId);
    });

    socketRef.current.on(SOCKET_EVENTS.DISCONNECT, (error: any) => {
      console.error('[socket] 연결 오류:', error);
      setConnectionStatus("소켓 연결 실패");
    });

    socketRef.current.on(SOCKET_EVENTS.USER_JOINED, async ({ userId }: { userId: string }) => {
      console.log(`[signal] 새 사용자 참가: ${userId}`);
      setConnectionStatus("상대방이 참가했습니다");

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
      console.log(`[signal] 사용자 연결 종료: ${userId}`);
      setConnectionStatus("상대방이 연결을 종료했습니다");
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
    <div className="p-2 fixed top-0 right-0">
      <h2 className="text-2xl font-bold mb-4">WebRTC 화상 채팅</h2>
      <div className="mb-2 text-blue-600">{connectionStatus}</div>

      <div className="flex flex-col flex-wrap gap-4">
        <div className="border p-2 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">내 화면</h3>
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className="bg-gray-200 w-60 h-40 object-cover"
          />
        </div>

        <div className="border p-2 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">상대방 화면</h3>
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="bg-gray-200 w-60 h-40 object-cover"
          />
        </div>
      </div>
    </div>
  );
};