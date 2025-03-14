"use client";

import DialogListItem from "../../../@components/DialogListItem";
import { LANGUAGE_MODE } from "@/constants/language";
import { MovieScene } from "@/types/script";
import { useSearchParams } from "next/navigation";

type DialogList = MovieScene;

export default function DialogList({ dialogues, speakers }: DialogList) {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");

  return (
    <ul className="mt-[45px] flex flex-col gap-[10px]">
      {dialogues.map((dialogue, index) => {
        const isDifferentSpeaker = speakers
          .filter((_, index) => index % 2 === 1)
          .includes(dialogue.speaker);

        return (
          <DialogListItem
            key={index}
            speaker={dialogue.speaker}
            text={mode === LANGUAGE_MODE.KOREAN ? dialogue.ko : dialogue.en}
            isLeft={isDifferentSpeaker}
            isBackground
          />
        );
      })}
    </ul>
  );
}
