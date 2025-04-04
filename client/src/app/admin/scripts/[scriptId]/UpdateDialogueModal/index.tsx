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

type UpdateDialogueModalProps = Dialogue;

export default function UpdateDialogueModal({
  id,
  english_script,
  korean_script,
}: UpdateDialogueModalProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [updateDialogueBody, setUpdateDialogueBody] = useState({ english_script, korean_script });

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
    } catch (err) {
      console.log(err);
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
                <div className="flex gap-2">Existing: {parseText(english_script, 'font-bold')}</div>
                <div className="flex gap-2">
                  Current Example: {parseText(updateDialogueBody.english_script, 'font-bold')}
                </div>
                <Field.Input
                  name="english_script"
                  value={updateDialogueBody.english_script}
                  onChange={handleInputChange}
                />
              </Field>
              <Field>
                <Field.Label>Korean</Field.Label>
                <div className="flex gap-2">Existing: {parseText(korean_script, 'font-bold')}</div>
                <div className="flex gap-2">
                  Current Example: {parseText(updateDialogueBody.korean_script, 'font-bold')}
                </div>
                <Field.Input
                  name="korean_script"
                  value={updateDialogueBody.korean_script}
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
