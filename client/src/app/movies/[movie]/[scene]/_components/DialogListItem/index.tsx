'use client';

import { CircleUserRound } from 'lucide-react';
import { Speaker } from '@/types/speaker';
import Text from '@/components/Text';
import clsx from 'clsx';
import { useState } from 'react';

type DialogListItem = {
  isBackground?: boolean;
  style?: React.CSSProperties;
  clickedText?: string;
  speaker: Speaker;
} & React.PropsWithChildren;

export default function DialogListItem({
  speaker,
  isBackground = false,
  style,
  clickedText,
  children,
}: DialogListItem) {
  const [isClicked, setIsClickeded] = useState(false);

  const toggleIsClickeded = () => {
    setIsClickeded((prev) => !prev);
  };

  if (speaker.speakerType == 'etc') {
    return <li className="text-center italic">{children}</li>;
  }

  return (
    <li
      onClick={toggleIsClickeded}
      style={style}
      className={clsx(
        'flex items-start gap-4 p-3 rounded-lg',
        speaker.speakerType === 'a' ? ' flex-row-reverse' : '',
        isBackground ? 'bg-gray-100 dark:bg-gray-800' : '',
      )}
    >
      <div className={clsx('flex flex-col items-center', 'text-gray-600 dark:text-gray-300')}>
        <CircleUserRound className="w-8 h-8" />
        <span className="text-sm font-medium">{speaker.speakerName}</span>
      </div>
      <div
        className={clsx(
          isBackground ? 'bg-white dark:bg-gray-700' : 'bg-gray-100 dark:bg-gray-800',
          'text-gray-900 dark:text-gray-100',
          'p-3 rounded-lg',
        )}
      >
        {children}
        {clickedText && isClicked && <Text>{clickedText}</Text>}
      </div>
    </li>
  );
}
