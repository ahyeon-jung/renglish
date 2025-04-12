import Button from '@/components/Button';
import Link from 'next/link';
import { PATHS } from '@/constants/path';
import React from 'react';
import clsx from 'clsx';

const LISTS = [
  { label: '회원 가이드', path: PATHS.NOTICES.MEMBER },
  { label: '과제 가이드', path: PATHS.NOTICES.ASSIGNMENT },
  { label: '모바일 설치 가이드(IOS)', path: PATHS.NOTICES.INSTALL },
];

export default function NoticesPage() {
  return (
    <main className={clsx('mt-[var(--header-height)]', 'flex flex-col gap-4 py-4 px-2')}>
      {LISTS.map(({ label, path }) => (
        <Link key={path} href={path}>
          <Button>{label}</Button>
        </Link>
      ))}
    </main>
  );
}
