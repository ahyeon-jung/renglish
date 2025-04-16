'use client';

import Container from '../Container';
import { PATHS } from '@/constants/path';
import { STUDY_STATUS_TAG } from '@/constants/tag';
import StudyItem from '@/app/studies/_components/StudyItem';
import getStudiesAction from '@/app/_actions/studies/getStudies';
import { useDataFetching } from '@/hooks/useDataFetching';
import { ListStudyDto, PaginationStudyResponseDto } from '@/services';
import { QUERY_KEYS } from '@/hooks/queryKeys';

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

  if (isLoading) {
    return (
      <Container label="Recruiting Studies" goTo={PATHS.STUDIES.LIST}>
        <div className="w-full space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="h-20 rounded-xl bg-gray-200 animate-pulse" />
          ))}
        </div>
      </Container>
    );
  }

  if (!data?.data?.data) return null;

  return (
    <Container label="Recruiting Studies" goTo={PATHS.STUDIES.LIST}>
      <div className="w-full">
        {data.data.data.map((study: ListStudyDto) => (
          <StudyItem key={study.id} {...study} />
        ))}
      </div>
    </Container>
  );
}
