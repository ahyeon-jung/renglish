"use client";

import applyToStudyAction from "@/app/actions/studies/applyToStudy";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import Text from "@/components/Text";
import { PATHS } from "@/constants/path";
import { MESSAGE } from "@/constants/toast";
import { GATHER_TOWN_URL } from "@/constants/url";
import { QUERY_KEYS } from "@/hooks/queryKeys";
import { useUserStore } from "@/stores/userStore";
import { goToLoginWithRedirect } from "@/utils/path";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import AlreadyAppliedModal from "../AlreadyAppliedModal";

const USER_STATUS = { ALREADY_APPLIED: "already", NO_AUTH: "no_token", APPLY_SUCCESS: "success" };

type ApplyToStudyModalProps = { sceneId: string; studyId: string };

export default function ApplyToStudyModal({ sceneId, studyId }: ApplyToStudyModalProps) {
  const { userId } = useUserStore();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const [userStatus, setUserStatus] = useState<string | null>(null);

  const handleApplyClick = async () => {
    if (!userId) {
      setUserStatus(USER_STATUS.NO_AUTH);
      return;
    }

    try {
      const { status } = await applyToStudyAction({ studyId });
      if (status === 401) {
        setUserStatus(USER_STATUS.NO_AUTH);
        return;
      }

      if (status === 409) {
        setUserStatus(USER_STATUS.ALREADY_APPLIED);
        return;
      }
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.STUDY.RECRUITING] });
      setUserStatus(USER_STATUS.APPLY_SUCCESS);
    } catch {
      toast.error(MESSAGE.COMMON.ERROR.SERVER);
    }
  };

  const closeModal = () => {
    setUserStatus(null);
  };

  return (
    <>
      <Button onClick={handleApplyClick} title="스터디 참여하기">
        참여 하기
      </Button>
      {userStatus === USER_STATUS.NO_AUTH && (
        <Modal className="w-[300px]" onClose={closeModal}>
          <Modal.Title>스터디 참여하기</Modal.Title>
          <Modal.Content>로그인 후 참여 신청해주세요</Modal.Content>
          <Link href={goToLoginWithRedirect(pathname)}>
            <Button>로그인하러 가기</Button>
          </Link>
        </Modal>
      )}
      {userStatus === USER_STATUS.APPLY_SUCCESS && (
        <Modal className="w-[300px]" onClose={closeModal}>
          <Modal.Title>스터디 참여신청 완료</Modal.Title>
          <Modal.Content className="flex flex-col gap-2">
            <Text as="p" typography="body-lg">
              해당 일자에 참여해주세요
            </Text>
            <Link href={GATHER_TOWN_URL}>
              <Button >게더타운 가기</Button>
            </Link>
            <Link href={PATHS.MEETING.DETAIL(sceneId)}>
              <Button variants="success" >온라인 미팅 하러가기</Button>
            </Link>
            <Button onClick={closeModal}>확인</Button>
          </Modal.Content>
        </Modal>
      )}
      {userStatus === USER_STATUS.ALREADY_APPLIED && (
        <AlreadyAppliedModal sceneId={sceneId} onClose={closeModal} studyId={studyId} />
      )}
    </>
  );
}
