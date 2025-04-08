'use client';

import Link from 'next/link';
import { STUDY_STATUS_TAG } from '@/constants/tag';
import Tag from '@/components/Tag';
import { useSearchParams } from 'next/navigation';

const STUDY_TAGS = [
  { label: '전체', value: 'all' },
  { label: '모집 중', value: STUDY_STATUS_TAG.RECRUITING },
  { label: '진행 완료', value: STUDY_STATUS_TAG.COMPLETED },
];

export default function StatusQueryTags() {
  const searchParams = useSearchParams();
  const status = searchParams.get('status');

  return (
    <div className="flex gap-6">
      {STUDY_TAGS.map(({ label, value }) => (
        <Link key={value} href={`?status=${value}`}>
          <Tag
            label={label}
            value={value}
            isActive={value !== 'all' ? status === value : status === value || !status}
          />
        </Link>
      ))}
    </div>
  );
}
