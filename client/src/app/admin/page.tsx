import Button from '@/components/Button';
import Link from 'next/link';
import { PATHS } from '@/constants/path';
import React from 'react';
import clsx from 'clsx';

export default function Admin() {
  return (
    <main className={clsx('mt-[var(--header-height)]', 'flex flex-col gap-4 py-4 px-2')}>
      <Link href={PATHS.ADMIN.SCRIPTS.ADD}>
        <Button>대본 추가하기</Button>
      </Link>
      <Link href={PATHS.ADMIN.SCRIPTS.LIST}>
        <Button>대본 목록보기</Button>
      </Link>
      <Link href={PATHS.ADMIN.USERS.LIST}>
        <Button>사용자 관리하기</Button>
      </Link>
      <Link href={PATHS.ADMIN.NOTICES.ADD}>
        <Button>공지사항 작성하기</Button>
      </Link>
      <Link href={PATHS.ADMIN.INQUIRIES.LIST}>
        <Button>문의 모아보기</Button>
      </Link>
    </main>
  );
}
