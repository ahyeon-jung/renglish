import ApplyToStudyModal from '../ApplyToStudyModal';
import Image from 'next/image';
import clsx from 'clsx';
import { formatDate } from '@/utils/format';
import { ListStudyDto } from '@/services';
import StudyMember from '../StudyMember';

type StudyItemProps = ListStudyDto;

export default function StudyItem({ ...study }: StudyItemProps) {
  return (
    <div
      className={clsx(
        'rounded-2xl shadow-md p-3 bg-white hover:shadow-lg transition-shadow',
        'flex flex-col gap-3',
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1 pr-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-1">{study.title}</h2>
          <p className="text-gray-600 text-sm mb-2">{study.description}</p>
          <p className="text-sm text-gray-500">{formatDate(study.studiedAt, 'long')}</p>
          <StudyMember applicants={study.applicants} participants={study.participants} isCompleted={study.isCompleted} />
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
      {!study.isCompleted && <ApplyToStudyModal studyId={study.id} />}
    </div>
  );
}
