import { Typography } from "@mui/material";

import { DateField, TextField, useRecordContext } from "react-admin";

import { SimpleShowLayout } from "react-admin";

import { Show } from "react-admin";

export const UserShow = () => {
  const record = useRecordContext();

  if (record === null) return null;
  return (
    <Show>
      <SimpleShowLayout>
        <Typography variant="h6" gutterBottom>
          Study Info
        </Typography>
        <TextField source="id" />
        <TextField source="email" />
        <TextField source="nickname" />
        <TextField source="provider" />
        <DateField source="createdAt" />
      </SimpleShowLayout>
    </Show>
  );
};

export default UserShow;
