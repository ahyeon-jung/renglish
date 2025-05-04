import Button from '@/components/Button';
import Text from '@/components/Text';
import { useEffect } from 'react';

type LocalVideoProps = {
  stream: MediaStream | null;
  isVideoEnabled: boolean;
  isAudioEnabled: boolean;
  videoRef: React.RefObject<HTMLVideoElement>;
  toggleVideo: () => void;
  toggleAudio: () => void;
};

export default function LocalVideo({
  stream,
  isVideoEnabled,
  isAudioEnabled,
  videoRef,
  toggleVideo,
  toggleAudio,
}: LocalVideoProps) {

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;

      stream.getVideoTracks().forEach(track => {
        track.enabled = isVideoEnabled;
      });

      stream.getAudioTracks().forEach(track => {
        track.enabled = isAudioEnabled;
      });
    }
  }, [stream, isVideoEnabled, isAudioEnabled, videoRef]);

  return (
    <div className="flex flex-col gap-1 bg-white border p-2 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">내 화면</h3>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="bg-gray-200 w-60 h-40 object-cover"
      />
      <div className="flex gap-2">
        <Button
          size='sm'
          onClick={toggleVideo}
        >
          <Text typography='body-md'> {isVideoEnabled ? "비디오 끄기" : "비디오 켜기"}</Text>
        </Button>
        <Button
          size='sm'
          variants='danger'
          onClick={toggleAudio}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          <Text typography='body-md'>
            {isAudioEnabled ? "마이크 끄기" : "마이크 켜기"}
          </Text>
        </Button>
      </div>
    </div>
  );
}
