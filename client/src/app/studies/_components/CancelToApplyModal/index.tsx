'use client';

import Button from '@/components/Button';
import { MESSAGE } from '@/constants/toast';
import Modal from '@/components/Modal';
import cancelToApplyToStudyAction from '@/app/_actions/studies/canceToApplyToStudy';
import { toast } from 'react-toastify';

type CancelToApplyModalProps = { studyId: string; onClose: () => void };

export default function CancelToApplyModal({ onClose, studyId }: CancelToApplyModalProps) {
  const handleCancelToApplyClick = async () => {
    try {
      const { status } = await cancelToApplyToStudyAction({ studyId });
      if (status) {
        onClose();
      }
    } catch {
      toast.error(MESSAGE.COMMON.ERROR.SERVER);
    }
  };

  return (
    <Modal className="w-[300px]" onClose={onClose}>
      <Modal.Title>이미 신청한 스터디</Modal.Title>
      <Modal.Content>이미 신청한 스터디입니다. 취소하시겠습니까?</Modal.Content>
      <Button onClick={handleCancelToApplyClick} variants="danger">
        참여 취소 하기
      </Button>
      <Button onClick={handleCancelToApplyClick}>닫기기</Button>
    </Modal>
  );
}
