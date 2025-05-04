"use client";

import { RefObject } from "react";

type RemoteVideoProps = {
  videoRef: RefObject<HTMLVideoElement>;
};

export default function RemoteVideo({ videoRef }: RemoteVideoProps) {
  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      className="bg-gray-200 w-60 h-40 object-cover"
    />
  );
}
