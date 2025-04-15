'use client';

import Button from '@/components/Button';
import { MESSAGE } from '@/constants/toast';
import Modal from '@/components/Modal';
import cancelToApplyToStudyAction from '@/app/_actions/studies/canceToApplyToStudy';
import { toast } from 'react-toastify';
import Text from '@/components/Text';
import Link from 'next/link';
import { GATHER_TOWN_URL } from '@/constants/url';

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
      <Modal.Content>
        <Text as="p" typography="body-lg">
          이미 신청한 스터디입니다. 취소하시겠습니까?
        </Text>
        <Text as="p" typography="body-lg">
          📌 게더타운 바로가기
          <Link href={GATHER_TOWN_URL}>click herer!</Link>
        </Text>
      </Modal.Content>
      <Button onClick={handleCancelToApplyClick} variants="danger">
        참여 취소 하기
      </Button>
      <Button onClick={handleCancelToApplyClick}>닫기기</Button>
    </Modal>
  );
}
