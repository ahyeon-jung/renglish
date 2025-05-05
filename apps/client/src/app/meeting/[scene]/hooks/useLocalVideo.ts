"use client";

import { useRef, useState } from "react";
import { toast } from "react-toastify";

export function useLocalVideo() {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);

  const toggleVideo = () => {
    setVideoEnabled((prev) => !prev);
  };

  const toggleAudio = () => {
    setAudioEnabled((prev) => !prev);
  };

  const pcRef = useRef<RTCPeerConnection | null>(null);

  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const startLocalStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: videoEnabled,
        audio: audioEnabled,
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
      toast.error("마이크/비디오 접근 실패");
      return null;
    }
  };
  return {
    localStream,
    videoEnabled,
    audioEnabled,
    toggleAudio,
    toggleVideo,
    pcRef,
    localVideoRef,
    startLocalStream,
  };
}
