'use client';

import Button from '@/components/Button';
import { Dialogue } from '@/types/dialogue';
import Field from '@/components/Field';
import Modal from '@/components/Modal';
import { Pencil } from 'lucide-react';
import { parseText } from '@/utils/content';
import updateDialogueAction from '@/app/_actions/dialogues/updateDialogue';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

type UpdateDialogueModalProps = Dialogue;

export default function UpdateDialogueModal({
  id,
  englishScript,
  koreanScript,
}: UpdateDialogueModalProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [updateDialogueBody, setUpdateDialogueBody] = useState({ englishScript, koreanScript });

  const openUpdateDialogueModal = () => {
    setIsOpen(true);
  };

  const closeUpdateDialogueModal = () => {
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdateDialogueBody((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateClick = async () => {
    try {
      await updateDialogueAction(id, updateDialogueBody);
      router.refresh();
      closeUpdateDialogueModal();
    } catch {
      toast.error('Failed to update dialogue');
    }
  };

  return (
    <>
      <Pencil className="absolute right-0 top-0 cursor-pointer" onClick={openUpdateDialogueModal} />
      {isOpen && (
        <Modal onClose={closeUpdateDialogueModal}>
          <Modal.Title>Update Dialogue</Modal.Title>
          <Modal.Content>
            <div className="w-[900px] flex flex-col gap-4">
              <Field>
                <Field.Label>English</Field.Label>
                <div className="flex gap-2">Existing: {parseText(englishScript, 'font-bold')}</div>
                <div className="flex gap-2">
                  Current Example: {parseText(updateDialogueBody.englishScript, 'font-bold')}
                </div>
                <Field.Input
                  name="englishScript"
                  value={updateDialogueBody.englishScript}
                  onChange={handleInputChange}
                />
              </Field>
              <Field>
                <Field.Label>Korean</Field.Label>
                <div className="flex gap-2">Existing: {parseText(koreanScript, 'font-bold')}</div>
                <div className="flex gap-2">
                  Current Example: {parseText(updateDialogueBody.koreanScript, 'font-bold')}
                </div>
                <Field.Input
                  name="koreanScript"
                  value={updateDialogueBody.koreanScript}
                  onChange={handleInputChange}
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
