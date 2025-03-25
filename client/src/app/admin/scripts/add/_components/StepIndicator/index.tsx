import { FunnelContext, FunnelContextType } from '@/hooks/useFunnel';
import React, { useContext } from 'react';
import { SCRIPT_ADD_STEP, ScriptAddStepType } from '../../_constants/step';

import { Check } from 'lucide-react';
import { ScriptAddBodyType } from '../../page';
import clsx from 'clsx';

const STEP_INDICATOR_OPTIONS = [
  { label: 'Movie', value: SCRIPT_ADD_STEP.MOVIE },
  { label: 'Scene', value: SCRIPT_ADD_STEP.SCENE },
  { label: 'Speakers', value: SCRIPT_ADD_STEP.SPEAKERS },
  { label: 'Conversation', value: SCRIPT_ADD_STEP.DIALOGUES },
];

const checkStepDataStatus = (data: ScriptAddBodyType, step: ScriptAddStepType) => {
  switch (step) {
    case SCRIPT_ADD_STEP.MOVIE:
      return data.movie.title && data.movie.imageUrl && data.movie.description;
    case SCRIPT_ADD_STEP.SCENE:
      return data.scene.title && data.scene.studiedAt && data.scene.description;
    case SCRIPT_ADD_STEP.SPEAKERS:
      return data.speakers.length !== 0;
    case SCRIPT_ADD_STEP.DIALOGUES:
      return data.dialogues.length !== 0;
  }
};

export default function StepIndicator() {
  const { data, step, setStep } = useContext(FunnelContext) as FunnelContextType<
    ScriptAddStepType,
    ScriptAddBodyType
  >;
  return (
    <div className="grid grid-cols-4 pt-4 gap-2">
      {STEP_INDICATOR_OPTIONS.map(({ label, value }, index) => {
        const isPassStepData = checkStepDataStatus(data, value);

        return (
          <div
            key={index}
            className={clsx(
              'flex justify-center text-center p-2 rounded-4xl',
              step === value
                ? 'bg-yellow-300'
                : isPassStepData
                  ? 'bg-yellow-200 cursor-pointer'
                  : 'bg-gray-100',
            )}
            onClick={() => {
              if (isPassStepData) {
                setStep(value);
              }
            }}
          >
            {label}
            {isPassStepData && <Check />}
          </div>
        );
      })}
    </div>
  );
}
