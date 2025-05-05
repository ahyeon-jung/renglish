import {
  Edit,
  SimpleForm,
  TextInput,
  BooleanInput,
  DateInput,
  useRecordContext,
} from "react-admin";
import { Box, Typography, Chip } from "@mui/material";

const ApplicantsList = () => {
  const record = useRecordContext();
  const applicants = record?.applicants || [];

  if (!Array.isArray(applicants) || applicants.length === 0) return null;

  return (
    <Box mt={2}>
      <Typography variant="subtitle1" gutterBottom>
        Applicants
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {applicants.map((applicant: any, index: number) => (
          <Chip key={index} label={applicant.nickname || applicant.id || "Unknown"} />
        ))}
      </Box>
    </Box>
  );
};

const ParticipantsList = () => {
  const record = useRecordContext();
  const participants = record?.participants || [];

  if (!Array.isArray(participants) || participants.length === 0) return null;

  return (
    <Box mt={2}>
      <Typography variant="subtitle1" gutterBottom>
        Participants
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {participants.map((p: any, index: number) => (
          <Chip key={index} label={p.nickname || p.id || "Unknown"} />
        ))}
      </Box>
    </Box>
  );
};

export const StudyEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <Typography variant="h6" gutterBottom>
          Study Info
        </Typography>
        <TextInput source="id" disabled />
        <TextInput source="title" fullWidth />
        <TextInput source="description" multiline fullWidth />
        <BooleanInput source="isCompleted" />

        <DateInput source="studiedAt" />

        <TextInput source="scene.title" label="Scene Title" />
        <DateInput source="createdAt" />

        <ApplicantsList />
        <ParticipantsList />
      </SimpleForm>
    </Edit>
  );
};

export default StudyEdit;
