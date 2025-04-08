'use client';

import Button from '@/components/Button';
import CancelToApplyModal from '../CancelToApplyModal';
import Link from 'next/link';
import { MESSAGE } from '@/constants/toast';
import Modal from '@/components/Modal';
import { PATHS } from '@/constants/path';
import applyToStudyAction from '@/app/_actions/studies/applyToStudy';
import { toast } from 'react-toastify';
import { useState } from 'react';

const USER_STATUS = { ALREADY_APPLIED: 'already', NO_AUTH: 'no_token', APPLY_SUCCESS: 'success' };

type ApplyToStudyModalProps = { studyId: string };

export default function ApplyToStudyModal({ studyId }: ApplyToStudyModalProps) {
  const [userStatus, setUserStatus] = useState<string | null>(null);

  const handleApplyClick = async () => {
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
      <Button onClick={handleApplyClick}>참여 하기</Button>
      {userStatus === USER_STATUS.NO_AUTH && (
        <Modal className="w-[300px]" onClose={closeModal}>
          <Modal.Title>스터디 참여하기</Modal.Title>
          <Modal.Content>로그인 후 참여 신청해주세요</Modal.Content>
          <Link href={PATHS.AUTH.LOGIN}>
            <Button>로그인하러 가기</Button>
          </Link>
        </Modal>
      )}
      {userStatus === USER_STATUS.APPLY_SUCCESS && (
        <Modal className="w-[300px]" onClose={closeModal}>
          <Modal.Title>스터디 참여신청 완료</Modal.Title>
          <Modal.Content>해당 일자에 참여해주세요</Modal.Content>
          <Button onClick={closeModal}>확인</Button>
        </Modal>
      )}
      {userStatus === USER_STATUS.ALREADY_APPLIED && (
        <CancelToApplyModal onClose={closeModal} studyId={studyId} />
      )}
    </>
  );
}
