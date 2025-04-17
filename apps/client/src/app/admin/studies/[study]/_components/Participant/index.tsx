'use client';

import Button from '@/components/Button';
import { StudyUserType } from '@/types/study';
import removeParticipantAction from '@/app/_actions/admin/studies/removeParticipant';
import { useRouter } from 'next/navigation';

type ParticipantProps = { studyId: string } & StudyUserType;

export default function Participant({ studyId, id, email }: ParticipantProps) {
  const router = useRouter();
  const handleRemoveParticipant = async () => {
    await removeParticipantAction({ studyId, userId: id });
    router.refresh();
  };

  return (
    <div className="flex justify-between items-center">
      <div>{email}</div>
      <div className="flex gap-2">
        <Button onClick={handleRemoveParticipant}>삭제</Button>
      </div>
    </div>
  );
}
