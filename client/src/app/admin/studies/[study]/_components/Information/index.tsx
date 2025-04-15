'use client';

import Button from '@/components/Button';
import Field from '@/components/Field';
import Modal from '@/components/Modal';
import { StudyType } from '@/types/study';
import { formatDate } from '@/utils/format';
import updateStudyAction from '@/app/_actions/admin/studies/updateStudy';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { StudyDto } from '@/services';
import completeStudyAction from '@/app/_actions/studies/completeStudy';

type InformationProps = StudyDto;

export default function Information({ id, title, description, studiedAt, isCompleted }: InformationProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [updateStudy, setUpdateStudyBody] = useState({
    title,
    description,
    studiedAt: studiedAt ? studiedAt.toString().split('T')[0] : '',
  });

  const openInformationModal = () => {
    setIsOpen(true);
  };

  const closeInformationModal = () => {
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUpdateStudyBody((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateStudyBody((prev) => ({
      ...prev,
      studiedAt: e.target.value,
    }));
  };

  const handleUpdateClick = async () => {
    try {
      await updateStudyAction(id, updateStudy);
      router.refresh();
      closeInformationModal();
    } catch {
      toast.error('Failed to update study');
    }
  };

  const handleCompleteStudyClick = async () => {
    try {
      await completeStudyAction(id);
      router.refresh();
    } catch {
      toast.error('Failed to complete study');
    }
  };

  return (
    <>
      <div onClick={openInformationModal}>
        <div>{title}</div>
        <div>{description}</div>
        <div>{formatDate(studiedAt)}</div>
      </div>
      {isCompleted && (
        <Button onClick={handleCompleteStudyClick}>스터디 완료로 변경</Button>
      )}
      {isOpen && (
        <Modal onClose={closeInformationModal}>
          <Modal.Title>Update Scene</Modal.Title>
          <Modal.Content>
            <div className="w-[400px] flex flex-col gap-4">
              <Field>
                <Field.Label>Title</Field.Label>
                <Field.Input name="title" value={updateStudy.title} onChange={handleInputChange} />
              </Field>
              <Field>
                <Field.Label>Description</Field.Label>
                <Field.Textarea
                  name="description"
                  value={updateStudy.description}
                  onChange={handleInputChange}
                />
              </Field>
              <Field>
                <Field.Label>Studied At</Field.Label>
                <Field.Input
                  type="date"
                  name="studiedAt"
                  value={updateStudy.studiedAt}
                  onChange={handleDateChange}
                />
              </Field>
            </div>
          </Modal.Content>
          <Button className="mt-2" onClick={handleUpdateClick} variants="primary">
            Update
          </Button>
        </Modal>
      )}
    </>
  );
}
