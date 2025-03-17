"use client";

import { MovieScene, MovieSceneDialogue } from "@/types/script";
import { useEffect, useState } from "react";

import DialogListItem from "../../../../@components/DialogListItem";
import { LANGUAGE_MODE } from "@/constants/language";
import { parseText } from "@/utils/content";
import { useSearchParams } from "next/navigation";

type DialogList = MovieScene;

export default function DialogList({ dialogues, speakers }: DialogList) {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");

  const [visibleDialogues, setVisibleDialogues] = useState<
    MovieSceneDialogue[]
  >([dialogues[0]]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let currentIndex = 1;

    const intervalDialogues = () => {
      timeoutId = setTimeout(() => {
        setVisibleDialogues((prev) => [...prev, dialogues[currentIndex]]);
        currentIndex++;

        if (currentIndex < dialogues.length) {
          intervalDialogues();
        }
      }, 2000);
    };

    intervalDialogues();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [dialogues]);

  useEffect(() => {
    window.scrollTo(0, window.scrollY + 100);
  }, [visibleDialogues]);

  return (
    <ul className="mt-[45px] flex flex-col gap-[10px]">
      {visibleDialogues.map((dialogue, index) => {
        const isDifferentSpeaker = speakers
          .filter((_, idx) => idx % 2 === 1)
          .includes(dialogue.speaker);

        return (
          <DialogListItem
            key={index}
            speaker={dialogue.speaker}
            isLeft={isDifferentSpeaker}
          >
            {parseText(
              mode === LANGUAGE_MODE.KOREAN ? dialogue.ko : dialogue.en
            )}
          </DialogListItem>
        );
      })}
    </ul>
  );
}
