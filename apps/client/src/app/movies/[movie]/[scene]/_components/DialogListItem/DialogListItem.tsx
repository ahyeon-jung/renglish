'use client';

import { CircleUserRound } from 'lucide-react';
import { Speaker } from '@/types/speaker';
import Text from '@/components/Text';
import clsx from 'clsx';
import { useState } from 'react';

export type DialogListItemProps = {
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
}: DialogListItemProps) {
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
        'flex items-start gap-4 p-2 rounded-lg',
        speaker.speakerType === 'a' ? 'flex-row-reverse' : '',
        isBackground ? '' : '',

      )}
    >
      <div className={clsx('flex flex-col items-center', 'text-gray-600 dark:text-gray-300')}>
        <CircleUserRound className="w-8 h-8" />
        <span className="text-sm font-medium">{speaker.speakerName}</span>
      </div>
      <div
        className={clsx(
          speaker.speakerType === 'a' ? "bg-gray-50" : 'bg-[#f0f0f0]',
          'p-3 rounded-lg',
          'text-gray-900',
        )}
      >
        {children}
        {clickedText && isClicked && <Text className='text-gray-500'>{clickedText}</Text>}
      </div>
    </li>
  );
}
