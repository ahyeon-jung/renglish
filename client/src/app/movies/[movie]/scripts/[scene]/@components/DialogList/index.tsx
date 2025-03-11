import DialogListItem from "../DialogListItem";
import { MovieSceneDialogue } from "@/types/script";

type DialogList = { dialogues: MovieSceneDialogue[] };

export default function DialogList({ dialogues }: DialogList) {
  return (
    <ul className="flex flex-col gap-[10px]">
      {dialogues.map((dialogue, index) => (
        <DialogListItem
          key={index}
          speaker={dialogue.speaker}
          text={dialogue.text}
        />
      ))}
    </ul>
  );
}
