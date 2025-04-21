'use client';

import Link from 'next/link';
import { PATHS } from '@/constants/path';
import Tag from '@/components/Tag';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { CATEGORIES } from '@/constants/categories';
import Text from '@/components/Text';

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
        <Text as="label" typography="subHead-md">카테고리로 보기</Text>
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
