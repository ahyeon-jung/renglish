import DialogListItem from "../DialogListItem";
import { MovieScene } from "@/types/script";

type DialogList = MovieScene;

export default function DialogList({ dialogues, speakers }: DialogList) {
  return (
    <ul className="flex flex-col gap-[10px]">
      {dialogues.map((dialogue, index) => {
        const isDifferentSpeaker = speakers
          .filter((_, index) => index % 2 === 1)
          .includes(dialogue.speaker);
        return (
          <DialogListItem
            key={index}
            speaker={dialogue.speaker}
            text={dialogue.en}
            isLeft={isDifferentSpeaker}
          />
        );
      })}
    </ul>
  );
}
