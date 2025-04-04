'use client';

import Link from 'next/link';
import { PATHS } from '@/constants/path';
import { Scene } from '@/types/scene';
import Text from '@/components/Text';
import clsx from 'clsx';

type ScriptLink = { index: number } & Pick<Scene, 'id' | 'title'>;

export default function ScriptLink({ index, title, id }: ScriptLink) {
  const sceneId = index > 9 ? index + 1 : '0' + (index + 1);

  return (
    <Link
      href={PATHS.MOVIE.SCENE.SCRIPT.ENGLISH(title, id.toString())}
      className={clsx('text-orange-600 hover:text-orange-800 transition-colors')}
    >
      <Text as="div" typography="subHead-md">
        Scene{' '}
        <Text as="span" typography="subHead-xl">
          {sceneId}
        </Text>
      </Text>
    </Link>
  );
}
