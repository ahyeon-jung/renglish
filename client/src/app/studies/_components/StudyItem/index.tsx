import Button from '@/components/Button';
import Image from 'next/image';
import { StudyType } from '@/types/study';
import clsx from 'clsx';
import { formatDate } from '@/utils/format';

type StudyItemProps = StudyType;

const APPLICANT_LIMIT = 8;

export default function StudyItem({ ...study }: StudyItemProps) {
  return (
    <div
      className={clsx(
        'rounded-2xl shadow-md p-4 bg-white hover:shadow-lg transition-shadow',
        'flex flex-col gap-3',
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1 pr-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-1">{study.title}</h2>
          <p className="text-gray-600 text-sm mb-2">{study.description}</p>
          <p className="text-sm text-gray-500">{formatDate(study.studiedAt, 'long')}</p>
          <div className="mt-2 text-sm font-medium text-gray-700">
            참여자: {study.applicantCount} / {APPLICANT_LIMIT}
          </div>
        </div>
        <div className="flex-shrink-0">
          <Image
            src={study.scene.movie.imageUrl}
            alt={study.scene.movie.title}
            width={100}
            height={100}
            className="rounded-xl object-cover"
          />
        </div>
      </div>
      <Button>참여하기</Button>
    </div>
  );
}
