import { CATEGORIES } from '@/app/movies/_components/Categories';
import Link from 'next/link';
import { PATHS } from '@/constants/path';
import Tag from '@/components/Tag';

export default function Categories() {
  return (
    <div className="w-[60%] grid grid-cols-4 place-items-center gap-y-2">
      {CATEGORIES.map((category) => (
        <Link key={category.value} href={`${PATHS.MOVIE.LIST}?category=${category.value}`}>
          <Tag size="sm" variant="outline" label={category.value} value={category.value} />
        </Link>
      ))}
    </div>
  );
}
