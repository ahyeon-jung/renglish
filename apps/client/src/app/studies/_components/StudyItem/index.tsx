import Text from "@/components/Text";
import { PATHS } from "@/constants/path";
import { formatDate } from "@/utils/format";
import type { ListStudyDto, StudyDto } from "@renglish/services";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import ApplyToStudyModal from "../ApplyToStudyModal";
import StudyMember from "../StudyMember";

type StudyItemProps =
  | (ListStudyDto & { nonApplicantsButton?: boolean })
  | (StudyDto & { nonApplicantsButton?: boolean });

export default function StudyItem({ nonApplicantsButton = false, ...study }: StudyItemProps) {
  return (
    <div
      className={clsx(
        "rounded-2xl shadow-md p-3 bg-white hover:shadow-lg transition-shadow",
        "flex flex-col gap-3 border-1 border-gray-200",
      )}
    >
      <div className="flex items-center gap-2 justify-between">
        <div className="relative flex-1">
          <Text as="h2" typography="headline-md" className="text-gray-800 mb-1">
            {study.title}
          </Text>
          <Text as="p" typography="body-md" className="text-gray-600 mb-2">
            {study.description}
          </Text>
          <Text as="p" typography="body-md" className="text-sm text-gray-500">
            {formatDate(study.studiedAt, "long")}
          </Text>
          <StudyMember
            applicants={study.applicants}
            participants={study.participants}
            isCompleted={study.isCompleted}
          />
        </div>
        <Link
          className="relative flex-shrink-0 group"
          title="대본 보러가기"
          href={PATHS.MOVIE.SCENE.SCRIPT.ENGLISH(study.scene.movie.title, study.scene.id)}
        >
          <div
            className={clsx(
              "absolute bottom-0 left-0 top-0 right-0",
              "pt-15",
              "text-orange-500 text-center text-sm font-bold z-[10000]",
              "rounded-xl hidden group-hover:block",
              "bg-black/70",
              "transition-opacity duration-300",
              "opacity-0 group-hover:opacity-100",
            )}
          >
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

      {!study.isCompleted && <ApplyToStudyModal sceneId={study.scene.id} studyId={study.id} />}
    </div>
  );
}
