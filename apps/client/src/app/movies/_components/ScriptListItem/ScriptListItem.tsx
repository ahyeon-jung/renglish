import Image from 'next/image';
import Link from 'next/link';
import { Movie } from '@/types/movie';
import { PATHS } from '@/constants/path';
import ScriptLink from '../ScriptLink';
import Text from '@/components/Text';
import clsx from 'clsx';
import { formatTitle } from '@/utils/format';

type ScriptListItem = Movie;

export default function ScriptListItem({
  id,
  title,
  imageUrl,
  scenes,
  description,
}: ScriptListItem) {
  return (
    <li
      className={clsx(
        'border border-gray-300 p-4 rounded-lg shadow-lg hover:shadow-xl',
        'transition-shadow duration-300',
      )}
    >
      <div className="flex justify-between gap-12">
        <div className="flex flex-col gap-1 w-full">
          <Link className="flex flex-col gap-1" href={PATHS.MOVIE.DETAIL(id)}>
            <Text as="h3" typography="display-sm">
              {formatTitle(title)}
            </Text>
            <Text as="p" typography='body-md'>{description.split(' ').slice(0, 20).join(' ')}...</Text>
          </Link>
          <div className="flex flex-col gap-2">
            {scenes &&
              scenes.map((scene, index) => (
                <ScriptLink
                  key={index}
                  index={index}
                  movieTitle={title}
                  title={scene.title}
                  id={scene.id}
                />
              ))}
          </div>
        </div>
        <div className="flex-shrink-0">
          <Image
            src={imageUrl}
            alt={title}
            width={100}
            height={100}
            className="rounded-xl object-cover"
          />
        </div>
      </div>
    </li>
  );
}
