import type { ListStudyDto } from "@renglish/services";

type StudyItemProps = Pick<ListStudyDto, "applicants" | "participants" | "isCompleted">;

const APPLICANT_LIMIT = 8;

export default function StudyMember({ ...study }: StudyItemProps) {
  const members = study.isCompleted ? study.participants : study.applicants;

  console.log(study.participants)
  return (
    <div>
      <div className="mt-2 text-sm font-medium text-gray-700">
        {study.isCompleted ? "참여자" : "예정 인원"}: {members?.length ?? 0} / {APPLICANT_LIMIT}
      </div>

      <div className="mt-2 flex gap-2 flex-wrap">
        {members &&
          members.length > 0 &&
          members.map((member, idx) => (
            <div
              key={member.id}
              className="w-8 h-8 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center text-sm font-medium shadow-sm"
              title={member.nickname}
            >
              {member.nickname?.charAt(0) || ""}
            </div>
          ))}
      </div>
    </div>
  );
}
