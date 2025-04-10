'use client';

import { Suspense, useEffect, useState } from 'react';

import Button from '@/components/Button';
import Categories from './_components/Categories';
import { ENV } from '@/constants/env';
import { Movie } from '@/types/movie';
import ScriptListItem from './_components/ScriptListItem';
import clsx from 'clsx';
import useSWRInfinite from 'swr/infinite';
import { useSearchParams } from 'next/navigation';

const PAGE_SIZE = 8;

const getKey = (category: string | null) => (pageIndex: number, previousPageData: Movie[]) => {
  if (previousPageData && !previousPageData.length) return null;

  let url = `/api/movies?limit=${PAGE_SIZE}&offset=${pageIndex + 1}`;

  if (category && category !== 'all') {
    url += `&category=${category}`;
  }
  return url;
};

const fetcher = async (url: string) => {
  const res = await fetch(`${ENV.API_BASE_URL}${url}`);
  const data = await res.json();
  return data;
};

export default function MoviesPage() {
  return (
    <Suspense>
      <MoviesPageContent />
    </Suspense>
  );
}

function MoviesPageContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  const [movies, setMovies] = useState<Movie[][]>([]);
  const { data, size, setSize, isLoading } = useSWRInfinite<Movie[]>(getKey(category), fetcher);

  useEffect(() => {
    if (!data) return;

    setMovies(data);
  }, [isLoading, data, size]);

  const isLast = movies && movies.length !== 0 && movies[movies.length - 1].length < PAGE_SIZE;

  return (
    <main className={clsx('mt-[var(--header-height)] p-3')}>
      <Categories />
      {isLoading && <div>Loading...</div>}
      <ul className="flex flex-col gap-[15px]">
        {movies.length > 0
          ? data?.flat().map((movie, index) => <ScriptListItem key={index} {...movie} />)
          : !isLoading && <div>No movies found</div>}
        {!isLast && <Button onClick={() => setSize(size + 1)}>Load More</Button>}
      </ul>
    </main>
  );
}
