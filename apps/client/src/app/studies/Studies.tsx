'use client';

import React from 'react';

import Button from '@/components/Button';
import StatusQueryTags from './_components/StatusQueryTags';
import StudyItem from './_components/StudyItem';
import clsx from 'clsx';
import { useSearchParams } from 'next/navigation';
import { PaginationStudyResponseDto } from '@renglish/services';
import { useInfiniteQuery } from '@tanstack/react-query';
import { ActionResponse } from '@/types/action';
import getStudiesAction from '../actions/studies/getStudies';

const PAGE_SIZE = 4;


export default function StudiesPage() {
  const searchParams = useSearchParams();
  const status = searchParams.get('status');

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery<ActionResponse<PaginationStudyResponseDto>>({
    initialPageParam: 1,
    queryKey: ['studies', status],
    queryFn: ({ pageParam }) => getStudiesAction({
      status: status ?? undefined,
      offset: pageParam as number ?? 1,
      limit: PAGE_SIZE,
    }),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      const totalPages = Math.ceil(lastPage.data.totalCount / PAGE_SIZE);
      return nextPage <= totalPages ? nextPage : undefined;
    }
  });

  const studies = data?.pages.flatMap(page => page.data.data) ?? [];


  return (
    <main className={clsx('mt-[var(--header-height)] p-3', 'flex flex-col gap-3')}>
      <StatusQueryTags />
      <div className="flex flex-col gap-3">
        {studies.length > 0
          ? studies.map((study) => <StudyItem key={study.id} {...study} />)
          : !isLoading && <div>No movies found</div>}
        {hasNextPage && (
          <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage ? 'Loading more...' : 'Load More'}
          </Button>
        )}
      </div>
    </main>
  );
}
