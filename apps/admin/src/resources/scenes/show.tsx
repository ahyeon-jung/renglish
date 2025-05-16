import { Show, SimpleShowLayout, TextField, useRecordContext } from "react-admin";
import { Typography, Box } from "@mui/material";
import RESOURCE from "../../constants/resource";
import { useState } from "react";

function DialogueList() {
  const record = useRecordContext();
  const speakers = record?.speakers || [];
  const [selectedSpeaker, setSelectedSpeaker] = useState<any | null>(null);

  if (!Array.isArray(speakers) || speakers.length === 0) return null;

  const handleSpeakerClick = (speaker: any) => {
    setSelectedSpeaker(speaker);
  };

  return (
    <Box mt={2}>
      <Typography variant="subtitle1" gutterBottom>
        Speakers
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {speakers.map((speaker) => (
          <Box
            key={speaker.id}
            sx={{
              flex: "0 1 30%",
              padding: 1,
              border: "1px solid #ccc",
              borderRadius: 2,
              cursor: "pointer",
            }}
            onClick={() => handleSpeakerClick(speaker)}
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
      <DialoguesList selectedSpeaker={selectedSpeaker} />
    </Box>
  );
}

function DialoguesList({ selectedSpeaker }: { selectedSpeaker: any }) {
  const record = useRecordContext();
  const dialogues = record?.dialogues || [];

  if (!Array.isArray(dialogues) || dialogues.length === 0) return null;

  const filteredDialogues = selectedSpeaker
    ? dialogues.filter((dialogue: any) => dialogue.speaker.id === selectedSpeaker.id)
    : dialogues;

  return (
    <Box mt={2}>
      <Typography variant="subtitle1" gutterBottom>
        Dialogues | {selectedSpeaker?.speakerName}
      </Typography>
      {filteredDialogues.map((dialogue) => (
        <Box key={dialogue.id} mb={1}>
          <Typography variant="body2">Korean Script: {dialogue.koreanScript}</Typography>
          <Typography variant="body2">English Script: {dialogue.englishScript}</Typography>
        </Box>
      ))}
    </Box>
  );
}

export default function SceneShow() {
  return (
    <Show resource={RESOURCE.SCENES}>
      <SimpleShowLayout>
        <Typography variant="h6" gutterBottom>
          Scene Info
        </Typography>
        <TextField source="id" />
        <TextField source="title" />
        <DialogueList />
      </SimpleShowLayout>
    </Show>
  );
}
