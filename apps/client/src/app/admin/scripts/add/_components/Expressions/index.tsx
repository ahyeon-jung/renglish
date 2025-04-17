'use client';

import { FunnelContext, FunnelContextType } from '@/hooks/useFunnel';
import { SCRIPT_ADD_STEP, ScriptAddStepType } from '../../_constants/step';
import { useContext, useEffect, useState } from 'react';

import { ScriptAddBodyType } from '../../page';
import StepFormContainer from '../StepFormContainer';
import { PaginationSceneDto, Speaker } from '@renglish/services';
import Field from '@/components/Field';
import getScenes from '@/app/actions/scenes/getScenes';
import addExpressionAction from '@/app/actions/expressions/addExpression';

type ScriptAddDialogueBodyType = string;

export type ScriptAddDialoguesBodyType = ScriptAddDialogueBodyType[];

export default function Expressions() {
  const { setStep } = useContext(FunnelContext) as FunnelContextType<
    ScriptAddStepType,
    ScriptAddBodyType
  >;
  const [scenes, setScenes] = useState<PaginationSceneDto[]>([]);
  const [selectedScene, setSelectedScene] = useState<{ id: string; speakers: Speaker[] }>({
    id: '',
    speakers: [],
  });
  const [expressionsBody, setExpressionsBody] = useState('');

  const handleExpressionsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    setExpressionsBody(input);
  };

  const handleNextClick = async () => {
    if (!expressionsBody) {
      alert('값을 입력해주세요.');
      return;
    }

    const formattedExpressions = expressionsBody.split('\n\n').map((expressionBody) => {
      const [expression, meaning, usage, ...examples] = expressionBody.split('\n');
      if (!expression || !meaning || !usage || !examples) {
        return;
      }

      const examplesArray = examples.map((example) => {
        const [english, korean] = example.split(':');
        return {
          en: english,
          ko: korean,
        };
      });

      return {
        expression,
        meaning,
        usage,
        examples: examplesArray,
      };
    });

    for (const expression of formattedExpressions) {
      if (!expression) {
        continue;
      }

      await addExpressionAction(selectedScene.id, expression);
    }
    setStep(SCRIPT_ADD_STEP.SUBMIT_CONFIRM);
  };

  useEffect(() => {
    const loadScenes = async () => {
      const fetched = await getScenes({ offset: 1, limit: 100 });
      setScenes(fetched.data.data);
    };
    loadScenes();
  }, []);

  return (
    <StepFormContainer onNext={handleNextClick}>
      <Field>
        <Field.Label>Scene</Field.Label>
        <Field.Select
          options={scenes.map(({ id, title }) => ({ value: id, label: title }))}
          value={selectedScene.id}
          onChange={(e) =>
            setSelectedScene({
              id: e.target.value,
              speakers: scenes.find((scene) => scene.id === e.target.value)?.speakers ?? [],
            })
          }
        />
      </Field>
      <div className="flex gap-3">
        <div>*Speakers: </div>
        {selectedScene.speakers.map((speaker, index) => (
          <div key={index}>{speaker.speakerName}</div>
        ))}
      </div>
      <textarea
        className="border w-full p-2 rounded-lg"
        rows={25}
        value={expressionsBody}
        onChange={handleExpressionsChange}
        placeholder={`
          Enter conversation in the following format:

          {expression}
          {meaning}
          {usage}
          {{example1_english}: {example1_korean}}
          {{example2_english}: {example2_korean}}
          `}
      />
    </StepFormContainer>
  );
}
