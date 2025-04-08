import Container from '../Container';
import { PATHS } from '@/constants/path';
import { STUDY_STATUS_TAG } from '@/constants/tag';
import StudyItem from '@/app/studies/_components/StudyItem';
import getStudiesAction from '@/app/_actions/studies/getStudies';

export default async function RecruitingStudies() {
  const {
    data: { data: studies },
  } = await getStudiesAction({ status: STUDY_STATUS_TAG.RECRUITING });

  return (
    <Container label="Recruiting Studies" goTo={PATHS.STUDIES.LIST}>
      <div className="w-full">
        {studies.map((study) => (
          <StudyItem key={study.id} {...study} />
        ))}
      </div>
    </Container>
  );
}
