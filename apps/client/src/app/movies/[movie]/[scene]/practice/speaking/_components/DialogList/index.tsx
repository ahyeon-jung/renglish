'use client';

import { useEffect, useState } from 'react';

import { LANGUAGE_MODE } from '@/constants/language';
import { Scene } from '@/types/scene';
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
    <div className="flex flex-col gap-4">
      {visibleDialogues.map((dialogue) => (
        <div key={dialogue.id} className="border p-4 rounded-md">
          <div className="text-sm text-gray-500">{dialogue.speaker.speakerName}</div>
          <div className="text-lg">
            {mode === LANGUAGE_MODE.KOREAN ? dialogue.koreanScript : dialogue.englishScript}
          </div>
        </div>
      ))}
    </div>
  );
}
