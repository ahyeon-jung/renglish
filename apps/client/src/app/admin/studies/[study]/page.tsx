import Applicant from './_components/Applicant';
import Information from './_components/Information';
import Participant from './_components/Participant';
import Text from '@/components/Text';
import getStudyAction from '@/app/actions/studies/getStudy';

export default async function AdminStudyDetail({ params }: { params: Promise<{ study: string }> }) {
  const { study: studyId } = await params;

  const { data: study } = await getStudyAction(studyId);

  return (
    <main className="mt-[var(--header-height)] p-3 flex flex-col gap-3">
      <Information {...study} />
      <div>
        <Text typography="display-md">지원자</Text>
        <div className="flex flex-col gap-2">
          {study.applicants?.map((applicant) => (
            <Applicant key={applicant.id} {...applicant} studyId={studyId} />
          ))}
        </div>
      </div>
      <div>
        <Text typography="display-md">참여자</Text>
        <div className="flex flex-col gap-2">
          {study.participants?.map((participant) => (
            <Participant key={participant.id} {...participant} studyId={studyId} />
          ))}
        </div>
      </div>
    </main>
  );
}
