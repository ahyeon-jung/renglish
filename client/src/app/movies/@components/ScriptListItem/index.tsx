import { formatDate, formatTitle } from '@/utils/format';

import { Calendar } from 'lucide-react';
import Link from 'next/link';
import { Movie } from '@/types/script';
import { PATHS } from '@/constants/path';
import ScriptLink from '../ScriptLink';
import Text from '@/components/Text';
import clsx from 'clsx';

type ScriptListItem = Movie;

export default function ScriptListItem({ id, title, studiedAt, scenes }: ScriptListItem) {
  return (
    <li
      className={clsx(
        'flex justify-between items-center',
        'border border-gray-300 p-6 rounded-lg shadow-lg hover:shadow-xl',
        'transition-shadow duration-300',
      )}
    >
      <div className="flex flex-col">
        <Link href={PATHS.MOVIE_DETAIL(id)}>
          <Text typography="display-sm">{formatTitle(title)}</Text>
        </Link>
        <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
          <Calendar size={16} />
          <Text as="div" typography="subHead-sm">
            {formatDate(studiedAt)}
          </Text>
        </div>
      </div>
      <div className="flex gap-4">
        {scenes.map((_, index) => (
          <ScriptLink key={index} title={title} id={index} />
        ))}
      </div>
    </li>
  );
}
