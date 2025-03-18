import Field from "@/components/Field";
import { PlusCircle } from "lucide-react";
import Text from "@/components/Text";
import { useState } from "react";

export type Speaker = {
  speaker_name: string;
  speaker_type: string;
};

type Speakers = {
  speakers: Speaker[];
  addSpeaker: (speakers: Speaker) => void;
};

export default function Speakers({ speakers, addSpeaker }: Speakers) {
  const [speaker, setSpeaker] = useState("");

  const handleSpeakerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpeaker(e.target.value);
  };

  const handleAddClick = () => {
    addSpeaker({ speaker_name: speaker, speaker_type: "A" });
    setSpeaker("");
  };

  console.log(speakers);

  return (
    <div>
      <Text as="h3" typography="display-md">
        Speakers
      </Text>
      <div className="flex gap-4">
        <div className="flex gap-2">
          {speakers.map((speaker, index) => (
            <div key={index}>{speaker.speaker_name}</div>
          ))}
        </div>
        <div className="flex gap-3">
          <PlusCircle onClick={handleAddClick} />
          <Field.Input value={speaker} onChange={handleSpeakerChange} />
        </div>
      </div>
    </div>
  );
}
