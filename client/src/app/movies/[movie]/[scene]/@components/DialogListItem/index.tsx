import { CircleUserRound } from 'lucide-react';
import { Speaker } from '@/types/speaker';
import clsx from 'clsx';

type DialogListItem = {
  isLeft?: boolean;
  isBackground?: boolean;
  style?: React.CSSProperties;

  speaker: Speaker;
} & React.PropsWithChildren;

export default function DialogListItem({
  speaker,

  isLeft = false,
  isBackground = false,
  style,
  children,
}: DialogListItem) {
  if (speaker.speaker_type == 'etc') {
    return <li className="text-center italic">{children}</li>;
  }

  return (
    <li
      style={style}
      className={clsx(
        'flex items-start gap-4 p-3 rounded-lg',
        isLeft ? ' flex-row-reverse' : '',
        isBackground ? 'bg-gray-100 dark:bg-gray-800' : '',
      )}
    >
      <div className={clsx('flex flex-col items-center', 'text-gray-600 dark:text-gray-300')}>
        <CircleUserRound className="w-8 h-8" />
        <span className="text-sm font-medium">{speaker.speaker_name}</span>
      </div>
      <div
        className={clsx(
          isBackground ? 'bg-white dark:bg-gray-700' : 'bg-gray-100 dark:bg-gray-800',
          'text-gray-900 dark:text-gray-100',
          'p-3 rounded-lg',
        )}
      >
        {children}
      </div>
    </li>
  );
}
