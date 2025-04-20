import ApplyToStudyModal from '../ApplyToStudyModal';
import Image from 'next/image';
import clsx from 'clsx';
import { formatDate } from '@/utils/format';
import { ListStudyDto, StudyDto } from '@renglish/services';
import StudyMember from '../StudyMember';
import Link from 'next/link';
import { PATHS } from '@/constants/path';
import Overlay from '@/components/Overlay';

type StudyItemProps =
  | (ListStudyDto & { nonApplicantsButton?: boolean })
  | (StudyDto & { nonApplicantsButton?: boolean });

export default function StudyItem({ nonApplicantsButton = false, ...study }: StudyItemProps) {
  return (
    <div
      className={clsx(
        'rounded-2xl shadow-md p-3 bg-white hover:shadow-lg transition-shadow',
        'flex flex-col gap-3 border-1 border-gray-200',
      )}
    >
      <div className="flex items-center gap-7 justify-between">
        <div className="relative flex-1 pr-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-1">{study.title}</h2>
          <p className="text-gray-600 text-sm mb-2">{study.description}</p>
          <p className="text-sm text-gray-500">{formatDate(study.studiedAt, 'long')}</p>
          <StudyMember
            applicants={study.applicants}
            participants={study.participants}
            isCompleted={study.isCompleted}
          />
        </div>
        <Link
          className="relative flex-shrink-0 group"
          href={PATHS.MOVIE.SCENE.SCRIPT.ENGLISH(study.scene.movie.title, study.scene.id)} >
          <div className={clsx(
            'absolute bottom-0 left-0 top-0 right-0',
            'pt-15',
            'text-white text-center text-sm font-bold z-[10000]',
            'rounded-xl hidden group-hover:block',
            'bg-black/50',
            'transition-opacity duration-300',
            'opacity-0 group-hover:opacity-100',
          )}>
            <div>go to script</div>
          </div>
          <Image
            src={study.scene.movie.imageUrl}
            alt={study.scene.movie.title}
            width={100}
            height={100}
            className="rounded-xl object-cover"
          />
        </Link>
      </div>
      {!nonApplicantsButton && !study.isCompleted && <ApplyToStudyModal studyId={study.id} />}
    </div>
  );
}
