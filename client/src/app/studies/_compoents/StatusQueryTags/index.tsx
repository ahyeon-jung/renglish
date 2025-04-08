import React from 'react';
import { STUDY_STATUS_TAG } from '@/constants/tag';
import Tag from '@/components/Tag';

const STUDY_TAGS = [
  { label: '전체', value: 'all' },
  { label: '모집 중', value: STUDY_STATUS_TAG.RECRUITING },
  { label: '진행 완료', value: STUDY_STATUS_TAG.COMPLETED },
];

export default function StatusQueryTags() {
  return (
    <div className="flex gap-6">
      {STUDY_TAGS.map(({ label, value }) => (
        <Tag key={value} label={label} value={value} />
      ))}
    </div>
  );
}
