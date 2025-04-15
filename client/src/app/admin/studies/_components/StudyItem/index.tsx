import Link from 'next/link';
import { PATHS } from '@/constants/path';
import clsx from 'clsx';
import { formatDate } from '@/utils/format';
import { ListStudyDto } from '@/services';
import completeStudyAction from '@/app/_actions/studies/completeStudy';
import Button from '@/components/Button';

type StudyItemProps = ListStudyDto;

const APPLICANT_LIMIT = 8;

export default function StudyItem({ ...study }: StudyItemProps) {

  const handleCompleteStudyClick = async () => {
    try {
      await completeStudyAction(study.id);

    } catch {

    }
  };

  return (
    <Link
      className={clsx(
        'rounded-2xl shadow-md p-4 bg-white hover:shadow-lg transition-shadow',
        'flex flex-col gap-3',
      )}
      href={PATHS.ADMIN.STUDIES.DETAIL(study.id)}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1 pr-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-1">{study.title}</h2>
          <p className="text-sm text-gray-500">{formatDate(study.studiedAt, 'long')}</p>
          <div className="mt-2 text-sm font-medium text-gray-700">
            {study.isCompleted ? '예정 인원' : '참여자'}:{' '}
            {study.isCompleted ? study.applicants?.length : study.participants?.length} / {APPLICANT_LIMIT}
          </div>
        </div>
        {!study.isCompleted && (
          <Button className='flex-[0.2]' onClick={handleCompleteStudyClick}>완료</Button>
        )}
      </div>
    </Link>
  );
}
