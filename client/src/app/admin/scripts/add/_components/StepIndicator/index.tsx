import { FunnelContext, FunnelContextType } from '@/hooks/useFunnel';
import React, { useContext } from 'react';
import { SCRIPT_ADD_STEP, ScriptAddStepType } from '../../_constants/step';

import { ScriptAddBodyType } from '../../page';
import clsx from 'clsx';

const STEP_INDICATOR_OPTIONS = [
  { label: 'Movie', value: SCRIPT_ADD_STEP.MOVIE },
  { label: 'Scene', value: SCRIPT_ADD_STEP.SCENE },
  { label: 'Speakers', value: SCRIPT_ADD_STEP.SPEAKERS },
  { label: 'Conversation', value: SCRIPT_ADD_STEP.DIALOGUES },
  { label: 'Expressions', value: SCRIPT_ADD_STEP.EXPRESSIONS },
];

export default function StepIndicator() {
  const { step, setStep } = useContext(FunnelContext) as FunnelContextType<
    ScriptAddStepType,
    ScriptAddBodyType
  >;
  return (
    <div className="grid grid-cols-4 pt-4 gap-2">
      {STEP_INDICATOR_OPTIONS.map(({ label, value }, index) => {
        return (
          <div
            key={index}
            className={clsx(
              'flex justify-center text-center p-2 rounded-4xl',
              step === value
                ? 'bg-yellow-300'
                :
                'bg-gray-100',
            )}
            onClick={() => {

              setStep(value);

            }}
          >
            {label}
          </div>
        );
      })}
    </div>
  );
}
