'use client';

import Container from '../Container';
import { PATHS } from '@/constants/path';
import { STUDY_STATUS_TAG } from '@/constants/tag';
import StudyItem from '@/app/studies/_components/StudyItem';
import getStudiesAction from '@/app/actions/studies/getStudies';
import { useDataFetching } from '@/hooks/useDataFetching';
import { ListStudyDto, PaginationStudyResponseDto } from '@renglish/services';
import { QUERY_KEYS } from '@/hooks/queryKeys';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination } from 'swiper/modules';

type StudyResponse = {
  status: number;
  success: boolean;
  message: string;
  data: PaginationStudyResponseDto;
};

export default function RecruitingStudies() {
  const { data, isLoading } = useDataFetching<StudyResponse>({
    queryKey: [QUERY_KEYS.STUDY.RECRUITING],
    queryFn: () => getStudiesAction({ status: STUDY_STATUS_TAG.RECRUITING }),
  });

  return (
    <Container label="Recruiting Studies" goTo={PATHS.STUDIES.LIST}>
      <div className="w-full">
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="h-20 rounded-xl bg-gray-200 animate-pulse"
              />
            ))}
          </div>
        ) : data?.data?.data ? (
          <Swiper
            spaceBetween={8}
            slidesPerView={data.data.data.length > 1 ? 1.1 : 1}
            pagination={{ clickable: true }}
            style={{
              '--swiper-pagination-color': '#f4c479',
            } as React.CSSProperties}
            modules={[Pagination]}
            className="py-42"
          >
            {data.data.data.map((study: ListStudyDto) => (
              <SwiperSlide key={study.id}>
                <StudyItem {...study} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : null}
      </div>
    </Container>
  );
}
