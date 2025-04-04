'use client';

import DialogListItem from '../../../../_components/DialogListItem';
import { WandSparkles } from 'lucide-react';
import { WritingDialogueType } from '@/types/dialogue';
import { parseText } from '@/utils/content';
import { useState } from 'react';

type WritingDialogueProps = {
  onChange: (dialogueId: string, writing: string) => void;
} & WritingDialogueType;

export default function WritingDialogue({
  id,
  onChange,
  speaker,
  korean_script,
  english_script,
  writing_script = '',
}: WritingDialogueProps) {
  const [inputValue, setInputValue] = useState(writing_script);
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
          {isShowAnswerDialogue && parseText(english_script)}
          <input
            value={inputValue}
            onChange={handleInputChange}
            className="border rounded-sm"
            style={{ width: `${Math.min(english_script.length * 8, 350)}px` }}
          />
          {parseText(korean_script)}
        </div>
        <WandSparkles size={20} onClick={toggleIsShowAnswerDialogue} />
      </div>
    </DialogListItem>
  );
}
