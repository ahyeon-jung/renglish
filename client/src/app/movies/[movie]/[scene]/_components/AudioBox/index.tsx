type AudioBoxProps = { audioUrl: string };

export default function AudioBox({ audioUrl }: AudioBoxProps) {
  return (
    <audio controls>
      <source src={audioUrl} type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  );
}
