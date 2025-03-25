import { FunnelContext, FunnelContextType } from '@/hooks/useFunnel';
import { SCRIPT_ADD_STEP, ScriptAddStepType } from '../../_constants/step';
import SpeakerAdd, { ScriptAddSpeakerType } from './SpeakerAdd';
import { useContext, useState } from 'react';

import { DeleteIcon } from 'lucide-react';
import { ScriptAddBodyType } from '../../page';
import StepFormContainer from '../StepFormContainer';

export type ScriptAddSpeakersBodyType = ScriptAddSpeakerType[];

export const INITIAL_SCRIPT_ADD_SPEAKER_BODY: ScriptAddSpeakersBodyType = [];

export default function Speakers() {
  const { data, setStep, setData } = useContext(FunnelContext) as FunnelContextType<
    ScriptAddStepType,
    ScriptAddBodyType
  >;
  const [speakers, setSpeakers] = useState(data.speakers);

  const addSpeaker = (speaker: ScriptAddSpeakerType) => {
    setSpeakers((prev) => [...prev, speaker]);
  };

  const removeSpeaker = (speakerName: string) => {
    setSpeakers((prev) => prev.filter((speaker) => speaker.speaker_name !== speakerName));
  };

  const handleNextClick = () => {
    setData((prev) => ({ ...prev, speakers }));
    setStep(SCRIPT_ADD_STEP.DIALOGUES);
  };

  const isAvailableNextButton = speakers.length !== 0;

  return (
    <StepFormContainer header="Speakers" onNext={handleNextClick} disabled={!isAvailableNextButton}>
      <div className="flex flex-col gap-4">
        <div className="flex w-[400px] flex-col gap-2">
          <div className="flex justify-between">
            <div>NAME</div>
            <div>TYPE</div>
            <div>ETC</div>
          </div>
          {speakers.map((speaker, index) => (
            <div className="flex justify-between" key={index}>
              <div>{speaker.speaker_name}</div>
              <div>{speaker.speaker_type}</div>
              <DeleteIcon onClick={() => removeSpeaker(speaker.speaker_name)} />
            </div>
          ))}
        </div>
        <SpeakerAdd addSpeaker={addSpeaker} />
      </div>
    </StepFormContainer>
  );
}
