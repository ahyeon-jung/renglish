'use client';

import { useEffect, useState } from 'react';

import Button from '@/components/Button';
import { ENV } from '@/constants/env';
import { Movie } from '@/types/movie';
import ScriptListItem from './_components/ScriptListItem';
import clsx from 'clsx';
import useSWRInfinite from 'swr/infinite';

const PAGE_SIZE = 6;

const getKey = (pageIndex: number, previousPageData: Movie[]) => {
  if (previousPageData && !previousPageData.length) return null;
  return `/api/movies?limit=${PAGE_SIZE}&offset=${pageIndex + 1}`;
};

const fetcher = async (url: string) => {
  const res = await fetch(`${ENV.API_BASE_URL}${url}`);
  const data = await res.json();
  return data;
};

export default function Scripts() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const { data, size, setSize, isLoading } = useSWRInfinite<Movie>(getKey, fetcher);

  useEffect(() => {
    if (!data) return;

    setMovies(data);
  }, [isLoading, data, size]);

  return (
    <main className={clsx('mt-[var(--header-height)] p-3')}>
      {isLoading && <div>Loading...</div>}
      <ul className="flex flex-col gap-[15px]">
        {movies.length > 0
          ? data?.flat().map((movie, index) => <ScriptListItem key={index} {...movie} />)
          : !isLoading && <div>No movies found</div>}
        <Button onClick={() => setSize(size + 1)}>Load More</Button>
      </ul>
    </main>
  );
}
