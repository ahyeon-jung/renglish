import { Box, Typography } from "@mui/material";
import type { Speaker } from "@renglish/services";
import { useEffect, useState } from "react";
import { ArrayInput, Create, SimpleForm, SimpleFormIterator, TextInput } from "react-admin";
import SelectScene from "../../components/SelectScene";
import RESOURCE from "../../constants/resource";
import { sceneApi } from "../../libs/api";

type DialogueCreateFormContentProps = {
  handleSelectSceneId: (id: string) => void;
  speakers: Speaker[]
}

const DialogueCreateFormContent = ({ handleSelectSceneId, speakers }: DialogueCreateFormContentProps) => {
  return (
    <>
      <Box width="100%" mb={2}>
        <SelectScene onSelect={handleSelectSceneId} />
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {speakers?.map((speaker) => (
            <Box
              key={speaker.id}
              sx={{
                padding: 1,
                border: "1px solid #ccc",
                borderRadius: 2,
                cursor: "pointer",
              }}
            >
              <Typography variant="body2">
                <strong>Name:</strong> {speaker.speakerName}
              </Typography>
              <Typography variant="body2">
                <strong>Type:</strong> {speaker.speakerType}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
      <Box width="100%" mb={2}>
        <Typography variant="h6">대화</Typography>
        <ArrayInput source="dialogues">
          <SimpleFormIterator>
            <TextInput source="speakerId" label="발화자 ID" />
            <TextInput source="korean_script" label="한국어 스크립트" />
            <TextInput source="english_script" label="영어 스크립트" />
          </SimpleFormIterator>
        </ArrayInput>
        <Box width="100%" mb={2}>
          <Typography variant="h6">대화</Typography>
          <TextInput source="content" multiline fullWidth rows={6} />
        </Box>
      </Box>
    </>
  );
};

export default function DialogueCreate() {
  const [selectedSceneId, setSelectedSceneId] = useState("");
  const [speakers, setSpeakers] = useState<Speaker[]>([]);

  const handleSelectSceneId = (id: string) => {
    setSelectedSceneId(id);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await sceneApi.sceneControllerFindSceneById({ sceneId: selectedSceneId });
      setSpeakers(data.speakers);
    };

    fetchData();
  }, [selectedSceneId]);


  const handleTransform = (data: any) => {
    if (data.content) {
      const content = data.content ?? "";
      const dialogues = content.split("\n\n").map((row: string, index: number) => {
        const [speakerName, englishScript, koreanScript] = row.split('\n');

        return {
          speakerId: speakers.find((speaker) => speaker.speakerName === speakerName)?.id,
          korean_script: koreanScript,
          english_script: englishScript,
          order: index,
        }
      })

      return {
        ...data,
        dialogues,
      };
    }

    return data
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await sceneApi.sceneControllerFindSceneById({ sceneId: selectedSceneId });
      setSpeakers(data.speakers);
    };

    fetchData();
  }, [selectedSceneId]);


  return (
    <Create resource={RESOURCE.DIALOGUES} transform={handleTransform}>
      <SimpleForm >
        <DialogueCreateFormContent speakers={speakers} handleSelectSceneId={handleSelectSceneId} />
      </SimpleForm>
    </Create>
  );
}
