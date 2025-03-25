'use client';

import { useEffect, useState } from 'react';

import DialogListItem from '../../../../@components/DialogListItem';
import { LANGUAGE_MODE } from '@/constants/language';
import { Scene } from '@/types/scene';
import { parseText } from '@/utils/content';
import { useSearchParams } from 'next/navigation';

type DialogList = Scene;

export default function DialogList({ dialogues }: DialogList) {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');

  const [visibleDialogues, setVisibleDialogues] = useState([dialogues[0]]);

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
        return (
          <DialogListItem key={index} speaker={dialogue.speaker}>
            {parseText(
              mode === LANGUAGE_MODE.KOREAN ? dialogue.korean_script : dialogue.english_script,
            )}
          </DialogListItem>
        );
      })}
    </ul>
  );
}
