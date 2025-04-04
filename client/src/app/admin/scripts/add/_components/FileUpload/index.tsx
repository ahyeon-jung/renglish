'use client';

import { FunnelContext, FunnelContextType } from '@/hooks/useFunnel';
import React, { useContext, useState } from 'react';
import { SCRIPT_ADD_STEP, ScriptAddStepType } from '../../_constants/step';

import Button from '@/components/Button';
import Field from '@/components/Field';
import Modal from '@/components/Modal';
import { ScriptAddBodyType } from '../../page';

export default function FileUpload() {
  const { setStep, setData } = useContext(FunnelContext) as FunnelContextType<
    ScriptAddStepType,
    ScriptAddBodyType
  >;

  const [isOpen, setIsOpen] = useState(false);

  const openUploadModal = () => {
    setIsOpen(true);
  };

  const closeUploadModal = () => {
    setIsOpen(false);
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target?.result as string);

        if (!validateScriptJsonStructure(jsonData)) {
          alert('Invalid JSON format. Please upload a correctly structured file.');
          return;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const dialoguesWithOrder = jsonData.dialogues.map((dialogue: any, index: number) => ({
          ...dialogue,
          order: index,
        }));
        setData({ ...jsonData, dialogues: dialoguesWithOrder });
        setStep(SCRIPT_ADD_STEP.SUBMIT_CONFIRM);
        closeUploadModal();
      } catch {
        alert('This is not a valid JSON file.');
      }
    };

    reader.readAsText(file);
  };

  return (
    <>
      <Button onClick={openUploadModal}>파일로 업로드하기</Button>
      {isOpen && (
        <Modal onClose={closeUploadModal}>
          <Modal.Title>Upload File Script</Modal.Title>
          <Modal.Content>
            <div>
              Upload file script.
              <br />
              Only json.
            </div>
            <Field.Input type="file" accept="application/json" onChange={onFileChange} />
          </Modal.Content>
          <Button variants="danger">Delete</Button>
        </Modal>
      )}
    </>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validateScriptJsonStructure = (jsonData: any): boolean => {
  if (
    !jsonData.movie ||
    !jsonData.scene ||
    !Array.isArray(jsonData.speakers) ||
    !Array.isArray(jsonData.dialogues)
  ) {
    return false;
  }

  const requiredMovieFields = ['title', 'category', 'imageUrl', 'description'];
  const requiredSceneFields = ['title', 'studiedAt', 'description'];
  const requiredSpeakerFields = ['speaker_name', 'speaker_type'];
  const requiredDialogueFields = ['speaker', 'english_script', 'korean_script'];

  if (!requiredMovieFields.every((key) => key in jsonData.movie)) return false;

  if (!requiredSceneFields.every((key) => key in jsonData.scene)) return false;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!jsonData.speakers.every((s: any) => requiredSpeakerFields.every((key) => key in s))) {
    return false;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!jsonData.dialogues.every((d: any) => requiredDialogueFields.every((key) => key in d))) {
    return false;
  }

  return true;
};
