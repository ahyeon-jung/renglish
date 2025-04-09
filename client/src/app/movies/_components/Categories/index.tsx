'use client';

import Link from 'next/link';
import { PATHS } from '@/constants/path';
import Tag from '@/components/Tag';
import { useSearchParams } from 'next/navigation';

export const CATEGORIES = [
  { value: 'all' },
  { value: 'romance' },
  { value: 'drama' },
  { value: 'action' },
  { value: 'comedy' },
  { value: 'adventure' },
  { value: 'thriller' },
  { value: 'sci-fi' },
];

export default function Categories() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  return (
    <div className="grid grid-cols-5 place-items-center gap-y-2 my-2">
      {CATEGORIES.map(({ value }) => (
        <Link key={value} href={`${PATHS.MOVIE.LIST}?category=${value}`}>
          <Tag size="md" label={value} value={value} isActive={category === value} />
        </Link>
      ))}
    </div>
  );
}
