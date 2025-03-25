import { FunnelContext, FunnelContextType } from '@/hooks/useFunnel';
import { SCRIPT_ADD_STEP, ScriptAddStepType } from '../../_constants/step';
import SpeakerAdd, { ScriptAddSpeakerType } from './SpeakerAdd';
import { useContext, useState } from 'react';

import { ScriptAddBodyType } from '../../page';
import StepFormContainer from '../StepFormContainer';

export type ScriptAddSpeakersBodyType = ScriptAddSpeakerType[];

export const INITIAL_SCRIPT_ADD_SPEAKER_BODY: ScriptAddSpeakersBodyType = [];

export default function Speakers() {
  const [speakers, setSpeakers] = useState(INITIAL_SCRIPT_ADD_SPEAKER_BODY);
  const { setStep, setData } = useContext(FunnelContext) as FunnelContextType<
    ScriptAddStepType,
    ScriptAddBodyType
  >;

  const addSpeaker = (speaker: ScriptAddSpeakerType) => {
    setSpeakers((prev) => [...prev, speaker]);
  };

  const handleNextClick = () => {
    setData((prev) => ({ ...prev, speakers }));
    setStep(SCRIPT_ADD_STEP.DIALOGUES);
  };

  return (
    <StepFormContainer header="Speakers" onNext={handleNextClick}>
      <div className="flex gap-4">
        <div className="flex gap-2">
          {speakers.map((speaker, index) => (
            <div key={index}>{speaker.speaker_name}</div>
          ))}
        </div>
        <SpeakerAdd addSpeaker={addSpeaker} />
      </div>
    </StepFormContainer>
  );
}
