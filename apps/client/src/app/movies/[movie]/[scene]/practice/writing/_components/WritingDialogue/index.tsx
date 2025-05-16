"use client";

import DialogListItem from "../../../../_components/DialogListItem";
import { WandSparkles } from "lucide-react";
import { WritingDialogueType } from "@/types/dialogue";
import { parseText } from "@/utils/content";
import { useState } from "react";

type WritingDialogueProps = {
  onChange: (dialogueId: string, writing: string) => void;
} & WritingDialogueType;

export default function WritingDialogue({
  id,
  onChange,
  speaker,
  koreanScript,
  englishScript,
  writingScript = "",
}: WritingDialogueProps) {
  const [inputValue, setInputValue] = useState(writingScript);
  const [isShowAnswerDialogue, setIsShowAnswerDialogue] = useState(false);

  const toggleIsShowAnswerDialogue = () => {
    setIsShowAnswerDialogue((prev) => !prev);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(id, newValue);
  };
  return (
    <DialogListItem speaker={speaker} isBackground>
      <div className="flex gap-[5px]">
        <div>
          {isShowAnswerDialogue && parseText(englishScript)}
          <input
            value={inputValue}
            onChange={handleInputChange}
            className="border rounded-sm"
            style={{ width: `${Math.min(englishScript.length * 8, 350)}px` }}
          />
          {parseText(koreanScript)}
        </div>
        <WandSparkles size={20} onClick={toggleIsShowAnswerDialogue} />
      </div>
    </DialogListItem>
  );
}
