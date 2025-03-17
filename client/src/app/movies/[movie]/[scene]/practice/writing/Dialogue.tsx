"use client";

import DialogListItem from "../../@components/DialogListItem";
import { MovieSceneDialogue } from "@/types/script";
import { WandSparkles } from "lucide-react";
import { parseText } from "@/utils/content";
import { useState } from "react";

type Dialogue = { isLeft?: boolean } & MovieSceneDialogue;

export default function Dialogue({ isLeft, speaker, ko, en }: Dialogue) {
  const [isShowAnswerDialogue, setIsShowAnswerDialogue] = useState(false);

  const toggleIsShowAnswerDialogue = () => {
    setIsShowAnswerDialogue((prev) => !prev);
  };

  return (
    <DialogListItem speaker={speaker} isLeft={isLeft} isBackground>
      <div className="flex gap-[5px]">
        <div>
          {isShowAnswerDialogue && parseText(en)}
          <input
            className="border rounded-sm"
            style={{ width: `${Math.min(en.length * 4, 350)}px` }}
          />
          {parseText(ko)}
        </div>
        <WandSparkles size={20} onClick={toggleIsShowAnswerDialogue} />
      </div>
    </DialogListItem>
  );
}
