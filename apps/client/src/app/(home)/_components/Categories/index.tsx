import Link from 'next/link';
import { PATHS } from '@/constants/path';
import Tag from '@/components/Tag';
import { CATEGORIES } from '@/constants/categories';

export default function Categories() {
  return (
    <div className="mt-[10px] grid grid-cols-4 place-items-center gap-x-2 gap-y-2">
      {CATEGORIES.map((category) => (
        <Link key={category.value} href={`${PATHS.MOVIE.LIST}?category=${category.value}`}>
          <Tag size="sm" variant="outline" label={category.value} value={category.value} />
        </Link>
      ))}
    </div>
  );
}
