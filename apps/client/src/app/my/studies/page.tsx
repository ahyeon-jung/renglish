import ListContainer from '../_components/ListContainer';
import StudyItem from '@/app/studies/_components/StudyItem';
import SubHeaderContainer from '@/components/SubheaderContainer';
import clsx from 'clsx';
import getStudiesAction from '@/app/_actions/my/getStudies';

export default async function Studies() {
  const { data: appliedStudies } = await getStudiesAction('applicant');
  const { data: participatedStudies } = await getStudiesAction('participant');

  return (
    <main className={clsx('mt-[var(--header-height)] p-3', 'flex flex-col gap-3')}>
      <SubHeaderContainer title="My Study List" />
      <div className="mt-[45px]">
        <ListContainer title="현재 지원한 스터디">
          {appliedStudies?.map((study) => <StudyItem key={study.id} {...study} />)}
        </ListContainer>
        <ListContainer title="참여한 스터디">
          {participatedStudies?.map((study) => (
            <StudyItem key={study.id} {...study} nonApplicantsButton />
          ))}
        </ListContainer>
      </div>
    </main>
  );
}
