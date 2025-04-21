'use client';

import { parseText } from '@/utils/content';
import DialogListItem from '../../_components/DialogListItem';
import { Dialogue } from '@/types/dialogue';
import { useState } from 'react';
import { DialogListItemProps } from '../../_components/DialogListItem/DialogListItem';

type FillDialogueListItemProps = DialogListItemProps & {
  dialogue: Dialogue;
  index: number;
};

export default function FillDialogueListItem({ dialogue, index }: FillDialogueListItemProps) {
  const [isClicked, setIsClicked] = useState(false);

  const toogleIsClicked = () => {
    setIsClicked((prev) => !prev);
  };

  return (
    <DialogListItem key={index} speaker={dialogue.speaker} isBackground>
      <div onClick={toogleIsClicked}>
        {parseText(
          dialogue.englishScript,
          isClicked ? 'text-gray-600 border-black border-b' : dialogue.speaker.speakerType === 'a' ? 'text-gray-50 border-black border-b' : 'text-[#f0f0f0] border-black border-b',
        )}
        {parseText(dialogue.koreanScript)}
      </div>
    </DialogListItem>
  );
}
