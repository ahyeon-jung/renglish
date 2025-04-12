'use client';

import Link from 'next/link';
import { PATHS } from '@/constants/path';
import Tag from '@/components/Tag';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

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

  const [isOpen, setIsOpen] = useState(!!category);

  const toggleCategories = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <>
      <div className="text-right" onClick={toggleCategories}>
        카테고리로 보기
      </div>
      {isOpen && (
        <div className="grid grid-cols-5 place-items-center gap-y-2 my-2">
          {CATEGORIES.map(({ value }) => (
            <Link key={value} href={`${PATHS.MOVIE.LIST}?category=${value}`}>
              <Tag size="md" label={value} value={value} isActive={category === value} />
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
