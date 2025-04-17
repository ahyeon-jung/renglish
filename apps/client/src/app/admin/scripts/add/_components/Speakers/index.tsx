import { FunnelContext, FunnelContextType } from '@/hooks/useFunnel';
import { SCRIPT_ADD_STEP, ScriptAddStepType } from '../../_constants/step';
import SpeakerAdd, { ScriptAddSpeakerType } from './SpeakerAdd';
import { useContext, useEffect, useState } from 'react';

import { DeleteIcon } from 'lucide-react';
import { ScriptAddBodyType } from '../../page';
import StepFormContainer from '../StepFormContainer';
import getScenes from '@/app/actions/scenes/getScenes';
import Field from '@/components/Field';
import addSpeakerAction from '@/app/actions/speakers/addSpeaker';
import { CreateSpeakerDto } from '@renglish/services';

export type ScriptAddSpeakersBodyType = ScriptAddSpeakerType[];

export const INITIAL_SCRIPT_ADD_SPEAKER_BODY: ScriptAddSpeakersBodyType = [];

export default function Speakers() {
  const [selectedSceneId, setSelectedSceneId] = useState<string>('');
  const [scenes, setScenes] = useState<{ label: string; value: string }[]>([]);
  const { setStep } = useContext(FunnelContext) as FunnelContextType<
    ScriptAddStepType,
    ScriptAddBodyType
  >;
  const [speakers, setSpeakers] = useState<CreateSpeakerDto[]>([]);

  const addSpeaker = (speaker: ScriptAddSpeakerType) => {
    setSpeakers((prev) => [
      ...prev,
      { speakerName: speaker.speaker_name, speakerType: speaker.speaker_type },
    ]);
  };

  const removeSpeaker = (speakerName: string) => {
    setSpeakers((prev) => prev.filter((speaker) => speaker.speakerName !== speakerName));
  };

  const handleNextClick = async () => {
    for (const speaker of speakers) {
      await addSpeakerAction(selectedSceneId, speaker);
    }
    setStep(SCRIPT_ADD_STEP.DIALOGUES);
  };

  const isAvailableNextButton = speakers.length !== 0;

  useEffect(() => {
    const loadScenes = async () => {
      const fetched = await getScenes({ offset: 1, limit: 100 });
      setScenes(fetched.data.data.map((scene) => ({ value: scene.id, label: scene.title })));
    };
    loadScenes();
  }, []);

  return (
    <StepFormContainer onNext={handleNextClick} disabled={!isAvailableNextButton}>
      <Field>
        <Field.Label>Scene</Field.Label>
        <Field.Select
          options={scenes}
          value={selectedSceneId}
          onChange={(e) => setSelectedSceneId(e.target.value)}
        />
      </Field>
      <div className="flex flex-col gap-4">
        <div className="flex w-[400px] flex-col gap-2">
          <div className="flex justify-between">
            <div>NAME</div>
            <div>TYPE</div>
            <div>ETC</div>
          </div>
          {speakers.map((speaker, index) => (
            <div className="flex justify-between" key={index}>
              <div>{speaker.speakerName}</div>
              <div>{speaker.speakerType}</div>
              <DeleteIcon onClick={() => removeSpeaker(speaker.speakerName)} />
            </div>
          ))}
        </div>
        <SpeakerAdd addSpeaker={addSpeaker} />
      </div>
    </StepFormContainer>
  );
}
