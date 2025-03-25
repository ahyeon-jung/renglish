import DeleteModal from '../DeleteModal';
import Link from 'next/link';
import { PATHS } from '@/constants/path';
import { Scene } from '@/types/scene';
import Text from '@/components/Text';
import clsx from 'clsx';
import { formatTitle } from '@/utils/format';

type ScriptListItem = Scene;

export default function ScriptListItem({ id, title, description }: ScriptListItem) {
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
        <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">{description}</div>
      </div>
      <div className="flex gap-4">
        <DeleteModal sceneId={id} />
      </div>
    </li>
  );
}
