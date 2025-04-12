'use client';

import Button from '@/components/Button';
import Field from '@/components/Field';
import Modal from '@/components/Modal';
import { Scene } from '@/types/scene';
import { formatDate } from '@/utils/format';
import updateSceneAction from '@/app/_actions/scenes/updateScene';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

type UpdateSceneModalProps = Scene;

export default function UpdateSceneModal({
  id,
  title,
  description,
  studiedAt,
}: UpdateSceneModalProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [updatedScene, setUpdatedScene] = useState({
    title,
    description,
    studiedAt: studiedAt ? studiedAt.toString().split('T')[0] : '',
  });

  const openUpdateSceneModal = () => {
    setIsOpen(true);
  };

  const closeUpdateSceneModal = () => {
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUpdatedScene((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedScene((prev) => ({
      ...prev,
      studiedAt: e.target.value,
    }));
  };

  const handleUpdateClick = async () => {
    try {
      await updateSceneAction(id, updatedScene);
      router.refresh();
      closeUpdateSceneModal();
    } catch {
      toast.error('Failed to update scene');
    }
  };

  return (
    <>
      <div
        className="border border-gray-300 rounded-xl p-6 cursor-pointer"
        onClick={openUpdateSceneModal}
      >
        <div className="font-bold">Scene Title:</div>
        <div>{title}</div>
        <div className="font-bold">Scene Information:</div>
        <div>{description}</div>
        <div className="font-bold">Study Date:</div>
        <div>{formatDate(studiedAt)}</div>
      </div>

      {isOpen && (
        <Modal onClose={closeUpdateSceneModal}>
          <Modal.Title>Update Scene</Modal.Title>
          <Modal.Content>
            <div className="w-[400px] flex flex-col gap-4">
              <Field>
                <Field.Label>Title</Field.Label>
                <Field.Input name="title" value={updatedScene.title} onChange={handleInputChange} />
              </Field>
              <Field>
                <Field.Label>Description</Field.Label>
                <Field.Textarea
                  name="description"
                  value={updatedScene.description}
                  onChange={handleInputChange}
                />
              </Field>
              <Field>
                <Field.Label>Studied At</Field.Label>
                <Field.Input
                  type="date"
                  name="studiedAt"
                  value={updatedScene.studiedAt}
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
