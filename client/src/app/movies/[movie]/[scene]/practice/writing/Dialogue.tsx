'use client';

import DialogListItem from '../../@components/DialogListItem';
import { Dialogue as DialogueType } from '@/types/dialogue';
import { WandSparkles } from 'lucide-react';
import { parseText } from '@/utils/content';
import { useState } from 'react';

type DialogueProps = DialogueType;

export default function Dialogue({ speaker, korean_script, english_script }: DialogueProps) {
  const [isShowAnswerDialogue, setIsShowAnswerDialogue] = useState(false);

  const toggleIsShowAnswerDialogue = () => {
    setIsShowAnswerDialogue((prev) => !prev);
  };

  return (
    <DialogListItem speaker={speaker} isBackground>
      <div className="flex gap-[5px]">
        <div>
          {isShowAnswerDialogue && parseText(english_script)}
          <input
            className="border rounded-sm"
            style={{ width: `${Math.min(english_script.length * 4, 350)}px` }}
          />
          {parseText(korean_script)}
        </div>
        <WandSparkles size={20} onClick={toggleIsShowAnswerDialogue} />
      </div>
    </DialogListItem>
  );
}
