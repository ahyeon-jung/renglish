import Button from '@/components/Button';
import Link from 'next/link';
import { PATHS } from '@/constants/path';
import React from 'react';
import clsx from 'clsx';

export default function MyPage() {
  return (
    <main className={clsx('mt-[var(--header-height)]', 'flex flex-col gap-4 py-4 px-2')}>
      <Link href={PATHS.MY.PROFILE}>
        <Button>내 정보</Button>
      </Link>
      <Link href={PATHS.MY.STUDIES}>
        <Button>참여한 스터디 목록</Button>
      </Link>
      <Link href={PATHS.MY.WRITINGS}>
        <Button>나의 작문들</Button>
      </Link>
      <Link href={PATHS.MY.INQUIRIES}>
        <Button>내가 작성한 문의사항</Button>
      </Link>
    </main>
  );
}
