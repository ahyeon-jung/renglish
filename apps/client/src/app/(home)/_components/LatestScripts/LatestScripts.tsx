'use client';

import Container from '../Container';
import Image from 'next/image';
import Link from 'next/link';
import Overlay from '@/components/Overlay';
import { PATHS } from '@/constants/path';
import Text from '@/components/Text';
import getLatestMovieAction from '@/app/actions/movies/getLatestMovie';
import { useDataFetching } from '@/hooks/useDataFetching';
import { Movie } from '@/types/movie';
import { QUERY_KEYS } from '@/hooks/queryKeys';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import { ActionResponse } from '@/types/action';

export default function LatestScripts() {
  const { data, isLoading } = useDataFetching<ActionResponse<Movie[]>>({
    queryKey: [QUERY_KEYS.MOVIE.LATEST,],
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

  return (
    <Container label="Latest Script" goTo={PATHS.MOVIE.LIST} ellipsisDescription="더 많은 대본 보러가기">
      <Swiper
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        modules={[Autoplay]}
        className="w-full h-[90px] overflow-hidden rounded-xl"
      >
        {data.data.map((movie, i) => (
          <SwiperSlide key={i} className="group relative h-[90px]">
            <Link href={`/movies/${movie.title}/${movie.scenes[0].id}/script/en`}>
              <Text
                className="absolute right-4 bottom-0 text-white group-hover:text-orange-400 z-[var(--overlay-text-z-index)]"
                typography="display-md"
              >
                {movie.title}
              </Text>
              <Overlay />
              <Image
                alt="inside out poster"
                src={movie.imageUrl}
                width={400}
                height={90}
                className="w-full h-full object-cover"
                priority
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
}
