import { Film, Flame, Grid, Heart, Shield, Smile, Theater, Users } from 'lucide-react';

import Container from '../Container';
import Icon from '@/components/Icon';
import Link from 'next/link';
import { PATHS } from '@/constants/path';

const SCRIPT_CATEGORIES = [
  { label: '전체보기', icon: Grid },
  { label: 'romance', icon: Heart },
  { label: 'drama', icon: Theater },
  { label: 'action', icon: Flame },
  { label: 'comedy', icon: Smile },
  { label: 'adventure', icon: Users },
  { label: 'thriller', icon: Shield },
  { label: 'sci-fi', icon: Film },
];

export default function Categories() {
  return (
    <Container label="Script Categories">
      <ul className="grid grid-cols-4 gap-3">
        {SCRIPT_CATEGORIES.map((category, index) => (
          <li
            key={index}
            className="flex justify-center items-center rounded-xl bg-gray-100 py-[20px]"
          >
            <Link href={PATHS.MOVIE.LIST}>
              <Icon label={category.label} icon={category.icon} />
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
