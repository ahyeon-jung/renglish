import React, { useState } from 'react';

import Field from '@/components/Field';
import { PlusCircle } from 'lucide-react';

export type ScriptAddSpeakerType = {
  speaker_name: string;
  speaker_type: string;
};

const INITIAL_SCRIPT_ADD_SCENE_BODY: ScriptAddSpeakerType = {
  speaker_name: '',
  speaker_type: '',
};

const SPEAKER_TYPE_OPTIONS = [
  { label: 'A', value: 'a' },
  { label: 'B', value: 'b' },
];

type SpeakerAddProps = { addSpeaker: (speaker: ScriptAddSpeakerType) => void };

export default function SpeakerAdd({ addSpeaker }: SpeakerAddProps) {
  const [speaker, setSpeaker] = useState(INITIAL_SCRIPT_ADD_SCENE_BODY);

  const handleSpeakerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSpeaker((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddClick = () => {
    addSpeaker(speaker);
    setSpeaker(INITIAL_SCRIPT_ADD_SCENE_BODY);
  };

  return (
    <div className="flex gap-3">
      <PlusCircle onClick={handleAddClick} className="cursor-pointer" />
      <Field.Input
        name="speaker_name"
        value={speaker.speaker_name}
        onChange={handleSpeakerChange}
        placeholder="Enter speaker name"
      />
      <Field.Select
        name="speaker_type"
        options={SPEAKER_TYPE_OPTIONS}
        value={speaker.speaker_type}
        onChange={handleSpeakerChange}
      />
    </div>
  );
}
