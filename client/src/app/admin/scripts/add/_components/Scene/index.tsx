import { FunnelContext, FunnelContextType } from '@/hooks/useFunnel';
import { SCRIPT_ADD_STEP, ScriptAddStepType } from '../../_constants/step';
import { useContext, useState } from 'react';

import Field from '@/components/Field';
import { ScriptAddBodyType } from '../../page';
import StepFormContainer from '../StepFormContainer';

export type ScriptAddSceneBodyType = {
  title: string;
  studiedAt: Date;
  description: string;
};

export const INITIAL_SCRIPT_ADD_SCENE_BODY: ScriptAddSceneBodyType = {
  title: '',
  studiedAt: new Date(),
  description: '',
};

export default function Scene() {
  const [sceneInfoBody, setSceneInfoBody] = useState(INITIAL_SCRIPT_ADD_SCENE_BODY);
  const { setStep, setData } = useContext(FunnelContext) as FunnelContextType<
    ScriptAddStepType,
    ScriptAddBodyType
  >;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSceneInfoBody((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    setSceneInfoBody((prev) => ({ ...prev, studiedAt: date }));
  };

  const handleNextClick = () => {
    setData((prev) => ({ ...prev, scene: sceneInfoBody }));
    setStep(SCRIPT_ADD_STEP.SPEAKERS);
  };

  const isAvailableNextButton =
    sceneInfoBody.title && sceneInfoBody.studiedAt && sceneInfoBody.description;

  return (
    <StepFormContainer
      header="Scene Information"
      onNext={handleNextClick}
      disabled={!isAvailableNextButton}
    >
      <Field>
        <Field.Label>Title</Field.Label>
        <Field.Input value={sceneInfoBody.title} name="title" onChange={handleChange} />
      </Field>
      <Field>
        <Field.Label>Study date</Field.Label>
        <Field.Date
          value={sceneInfoBody.studiedAt ? sceneInfoBody.studiedAt.toISOString().split('T')[0] : ''}
          onChange={handleDateChange}
        />
      </Field>
      <Field>
        <Field.Label>Description</Field.Label>
        <Field.Input value={sceneInfoBody.description} name="description" onChange={handleChange} />
      </Field>
    </StepFormContainer>
  );
}
