'use client';

import Button from '@/components/Button';
import { StudyUserType } from '@/types/study';
import promoteToParticipantAction from '@/app/_actions/admin/studies/promoteToParticipant';
import removeApplicantAction from '@/app/_actions/admin/studies/removeApplicant';
import { useRouter } from 'next/navigation';

type ApplicantProps = { studyId: string } & StudyUserType;

export default function Applicant({ studyId, id, email }: ApplicantProps) {
  const router = useRouter();
  const handleApprove = async () => {
    await promoteToParticipantAction({ studyId, userId: id });
    router.refresh();
  };

  const handleReject = async () => {
    await removeApplicantAction({ studyId, userId: id });
    router.refresh();
  };

  return (
    <div className="flex justify-between items-center">
      <div>{email}</div>
      <div className="flex gap-2">
        <Button onClick={handleApprove}>참여</Button>
        <Button onClick={handleReject}>불참</Button>
      </div>
    </div>
  );
}
