'use client';

import Container from '../Container';
import Image from 'next/image';
import Link from 'next/link';
import Overlay from '@/components/Overlay';
import { PATHS } from '@/constants/path';
import Text from '@/components/Text';
import getLatestMovieAction from '@/app/_actions/movies/getLatestMovie';
import { useDataFetching } from '@/hooks/useDataFetching';
import { Movie } from '@/types/movie';

export default function LatestScript() {
  const { data, isLoading } = useDataFetching<{ data: Movie }>({
    queryKey: ['latest-movie'],
    queryFn: getLatestMovieAction,
  });

  if (isLoading) {
    return (
      <Container label="Latest Script" goTo={PATHS.MOVIE.LIST}>
        <div className="h-[100px] rounded-xl bg-gray-200 animate-pulse" />
      </Container>
    );
  }

  if (!data?.data) return null;

  const movie = data.data;

  return (
    <Container label="Latest Script" goTo={PATHS.MOVIE.LIST}>
      <Link
        href={`/movies/${movie.title}/${movie.scenes[0].id}/script/en`}
        className="group relative h-[100px] overflow-hidden rounded-xl"
      >
        <Text
          className="absolute right-4 bottom-0 text-white group-hover:text-orange-400 z-[var(--overlay-text-z-index)]"
          typography="display-xl"
        >
          {movie.title}
        </Text>
        <Overlay />
        <Image
          alt="inside out poster"
          src={movie.imageUrl}
          width={500}
          height={100}
          className="w-full h-full object-cover"
        />
      </Link>
    </Container>
  );
}
