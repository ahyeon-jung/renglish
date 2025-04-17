'use client';

import Button from '@/components/Button';
import Modal from '@/components/Modal';
import ResultDialogueItem from '../ResultDialogueItem';
import Text from '@/components/Text';
import { WritingDialogueType } from '@/types/dialogue';
import addWritingAction from '@/app/actions/writings/addWritings';
import { useState } from 'react';

type ResultModalProps = { dialogues: WritingDialogueType[] };

export default function ResultModal({ dialogues }: ResultModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openResultModal = () => {
    setIsOpen(true);
  };

  const closeResultModal = () => {
    setIsOpen(false);
  };

  const handleSaveClick = async () => {
    const writingsPromises = dialogues.map(async (dialogue) => {
      if (dialogue.writingScript !== undefined) {
        return addWritingAction({
          dialogueId: dialogue.id,
          writing: dialogue.writingScript,
        });
      }
    });

    await Promise.all(writingsPromises);
  };

  return (
    <>
      <Button onClick={openResultModal}>Complete</Button>
      {isOpen && (
        <Modal onClose={closeResultModal}>
          <Modal.Title>
            <Text as="h3" typography="display-md">
              Writing Result
            </Text>
            <Text as="p" typography="body-lg">
              Compare your script with origin script.
            </Text>
          </Modal.Title>

          <Modal.Content>
            {dialogues.map((dialogue) => (
              <ResultDialogueItem {...dialogue} key={dialogue.id} />
            ))}
          </Modal.Content>
          <div className="flex gap-2">
            <Button variants="secondary" onClick={closeResultModal}>
              Retry
            </Button>
            <Button variants="success" onClick={handleSaveClick}>
              Save
            </Button>
            <Button variants="primary" onClick={closeResultModal}>
              Start New
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
}
