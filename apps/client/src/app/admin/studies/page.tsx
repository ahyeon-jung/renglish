'use client';

import React, { Suspense, useEffect, useState } from 'react';

import Button from '@/components/Button';
import StatusQueryTags from '@/app/studies/_components/StatusQueryTags';
import StudyItem from './_components/StudyItem';
import clsx from 'clsx';
import useSWRInfinite from 'swr/infinite';
import { useSearchParams } from 'next/navigation';
import { ListStudyDto } from '@renglish/services';

const PAGE_SIZE = 5;

const getKey = (status: string | null) => (pageIndex: number, previousPageData: ListStudyDto[]) => {
  if (previousPageData && !previousPageData.length) return null;

  let url = `/api/studies?limit=${PAGE_SIZE}&offset=${pageIndex + 1}`;
  if (status) {
    url += `&status=${status}`;
  }

  return url;
};

const fetcher = async (url: string) => {
  const res = await fetch(`${url}`);
  const data = await res.json();
  return data;
};

export default function StudiesPage() {
  return (
    <Suspense fallback={<div>로딩중</div>}>
      <StudiesContent />
    </Suspense>
  );
}

function StudiesContent() {
  const searchParams = useSearchParams();
  const status = searchParams.get('status');

  const [studies, setStudies] = useState<ListStudyDto[][]>([]);
  const { data, size, setSize, isLoading } = useSWRInfinite<ListStudyDto[]>(
    getKey(status),
    fetcher,
  );
  useEffect(() => {
    if (!data) return;

    setStudies(data);
  }, [isLoading, data, size]);

  const isLast = studies && studies.length !== 0 && studies[studies.length - 1].length < PAGE_SIZE;

  return (
    <main className={clsx('mt-[var(--header-height)] p-3', 'flex flex-col gap-3')}>
      <StatusQueryTags />
      <div className="flex flex-col gap-3">
        {studies.length > 0
          ? data?.flat().map((study) => <StudyItem key={study.id} {...study} />)
          : !isLoading && <div>No movies found</div>}
        {!isLast && <Button onClick={() => setSize(size + 1)}>Load More</Button>}
      </div>
    </main>
  );
}
