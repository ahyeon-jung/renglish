import RESOURCE from "../../constants/resource";
import { Create, SimpleForm, TextInput, ArrayInput, SimpleFormIterator } from "react-admin";
import { Typography, Box } from "@mui/material";
import SelectScene from "../../components/SelectScene";
import { useEffect, useState } from "react";
import { sceneApi } from "../../libs/api";
import { Speaker } from "@renglish/services";

const DialogueCreateFormContent = () => {
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
      </Box>
    </>
  );
};

export default function DialogueCreate() {
  return (
    <Create resource={RESOURCE.SPEAKERS}>
      <SimpleForm>
        <DialogueCreateFormContent />
      </SimpleForm>
    </Create>
  );
}
