'use client';

import { useSearchParams } from 'next/navigation';
import { useInfiniteQuery } from '@tanstack/react-query';

import Button from '@/components/Button';
import Categories from './_components/Categories';
import ScriptListItem from './_components/ScriptListItem';
import clsx from 'clsx';
import { Movie } from '@/types/movie';
import getMovies from '../actions/movies/getMovies';
import { PaginationResponse } from '@/types/api';
import { ActionResponse } from '@/types/action';

const PAGE_SIZE = 5;

export default function MoviesPage() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery<ActionResponse<PaginationResponse<Movie>>>({
    initialPageParam: 1,
    queryKey: ['movies', category],
    queryFn: ({ pageParam }) => getMovies({
      keyword: undefined,
      category: category ?? undefined,
      offset: pageParam as number ?? 1,
      limit: PAGE_SIZE,
    }),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      const totalPages = Math.ceil(lastPage.data.totalCount / PAGE_SIZE);
      return nextPage <= totalPages ? nextPage : undefined;
    }
  });

  const movies = data?.pages.flatMap(page => page.data.data) ?? [];

  return (
    <main className={clsx('mt-[var(--header-height)] p-3')}>
      <Categories />
      {isLoading && <div>Loading...</div>}
      <ul className="flex flex-col gap-[15px]">
        {movies.length > 0
          ? movies.map((movie, index) => <ScriptListItem key={index} {...movie} />)
          : !isLoading && <div>No movies found</div>}
        {hasNextPage && (
          <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage ? 'Loading more...' : 'Load More'}
          </Button>
        )}
      </ul>
    </main>
  );
}