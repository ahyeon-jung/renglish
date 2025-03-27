'use client';

import Button from '@/components/Button';
import Modal from '@/components/Modal';
import { Trash2 } from 'lucide-react';
import deleteScene from '@/app/_actions/scenes/deleteScene';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type DeleteModalProps = { sceneId: string };

export default function DeleteModal({ sceneId }: DeleteModalProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const openDeleteModal = () => {
    setIsOpen(true);
  };

  const closeDeleteModal = () => {
    setIsOpen(false);
  };

  const handleDeleteClick = async () => {
    try {
      await deleteScene(sceneId);
      router.refresh();
      closeDeleteModal();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Trash2 onClick={openDeleteModal} />
      {isOpen && (
        <Modal onClose={closeDeleteModal}>
          <Modal.Title>Delete Modal</Modal.Title>
          <Modal.Content>
            Are you sure you want to delete this script?
            <br />
            This action cannot be undone.
          </Modal.Content>
          <Button onClick={handleDeleteClick} variants="danger">
            Delete
          </Button>
        </Modal>
      )}
    </>
  );
}
