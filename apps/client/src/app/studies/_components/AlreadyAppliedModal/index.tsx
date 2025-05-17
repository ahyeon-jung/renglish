"use client";

import cancelToApplyToStudyAction from "@/app/actions/studies/canceToApplyToStudy";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { PATHS } from "@/constants/path";
import { MESSAGE } from "@/constants/toast";
import { GATHER_TOWN_URL } from "@/constants/url";
import { QUERY_KEYS } from "@/hooks/queryKeys";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { toast } from "react-toastify";

type AlreadyAppliedModalProps = { sceneId: string; studyId: string; onClose: () => void };

export default function AlreadyAppliedModal({ sceneId, onClose, studyId }: AlreadyAppliedModalProps) {
  const queryClient = useQueryClient();

  const handleCancelToApplyClick = async () => {
    try {
      const { status } = await cancelToApplyToStudyAction({ studyId });
      if (status) {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.STUDY.RECRUITING] });
        onClose();
      }
    } catch {
      toast.error(MESSAGE.COMMON.ERROR.SERVER);
    }
  };

  return (
    <Modal className="w-[300px]" onClose={onClose}>
      <Modal.Content>
        <Link href={GATHER_TOWN_URL}>
          <Button >게더타운 가기</Button>
        </Link>
        <Link href={PATHS.MEETING.DETAIL(sceneId)}>
          <Button variants="success" >온라인 미팅 하러가기</Button>
        </Link>
        <Button onClick={handleCancelToApplyClick} variants="danger">
          참여 취소 하기
        </Button>
        <Button onClick={onClose} variants="secondary">닫기</Button>
      </Modal.Content>
    </Modal>
  );
}
