'use client';

import Dialog from '@/components/Dialog';
import Link from 'next/link';
import { PATHS } from '@/constants/path';
import clsx from 'clsx';
import { createPortal } from 'react-dom';
import { useState } from 'react';
import { Ellipsis } from 'lucide-react';

const SCENE_OPTIONS = [
  { label: '영어 대본만 보기', path: PATHS.MOVIE.SCENE.SCRIPT.ENGLISH },
  { label: '한글 대본만 보기', path: PATHS.MOVIE.SCENE.SCRIPT.KOREAN },
  { label: '영어-한글 대본 보기', path: PATHS.MOVIE.SCENE.SCRIPT.DUAL },
  { label: '스피킹 연습하기', path: PATHS.MOVIE.SCENE.PRACTICE.SPEAKING },
  { label: '빈칸 연습하기', path: PATHS.MOVIE.SCENE.PRACTICE.FILL },
  { label: '작문 연습하기(회원전용)', path: PATHS.MOVIE.SCENE.PRACTICE.WRITING },
  { label: '영어 표현학습하기(회원전용)', path: PATHS.MOVIE.SCENE.PRACTICE.EXPRESSION },
  { label: '다운로드하기(회원전용)', path: PATHS.MOVIE.SCENE.SCRIPT.DOWNLOAD },
];

export type SceneNavProps = {
  movieId: string;
  sceneId: string;
  iconSize: number;
};

export default function SceneNav({ movieId, sceneId, iconSize }: SceneNavProps) {
  const [isOpenSceneNav, setIsOpenSceneNav] = useState(false);

  const openSceneNav = () => {
    setIsOpenSceneNav(true);
  };
  const closeSceneNav = () => {
    setIsOpenSceneNav(false);
  };

  return (
    <>
      <div className="cursor-pointer" title="다른 버전으로 보기" onClick={openSceneNav}>
        <Ellipsis size={iconSize} />
      </div>
      {isOpenSceneNav &&
        createPortal(
          <Dialog isOpen={isOpenSceneNav} onClose={closeSceneNav} isSub>
            <ul
              style={{
                top: 'calc(var(--header-height) + 50px - 5px)',
                zIndex: `calc(var(--header-z-index) + 1)`,
              }}
              className={clsx(
                'fixed inset-x-0',
                'bg-white shadow-sm',
                'flex flex-col items-center gap-2 py-3',
              )}
            >
              {SCENE_OPTIONS.map(({ label, path }) => (
                <Link
                  key={path(movieId, sceneId)}
                  href={path(movieId, sceneId)}
                  replace
                  className={clsx(
                    'w-[300px] text-center py-1',
                    'border-b border-b-white hover:border-b-black',
                    'transition-all duration-300 ease-in-out',
                  )}
                >
                  {label}
                </Link>
              ))}
            </ul>
          </Dialog>,
          document.body,
        )}
    </>
  );
}
