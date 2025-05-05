import { Show, SimpleShowLayout, TextField, DateField, useRecordContext } from "react-admin";
import { Box, Typography, Card, CardContent } from "@mui/material";

const ScenesList = () => {
  const record = useRecordContext();

  if (!record?.scenes) return null;

  const flatScenes = record.scenes.flat?.() || [];

  return (
    <Box mt={2}>
      <Typography variant="h6" gutterBottom>
        Scenes
      </Typography>

      {flatScenes.map((scene: any, index: number) => (
        <Card key={scene.id ?? index} variant="outlined" sx={{ mb: 1, p: 1 }}>
          <CardContent sx={{ padding: "8px !important" }}>
            <Typography variant="body2" color="text.secondary">
              ID: {scene.id}
            </Typography>
            <Typography variant="body2">Title: {scene.title}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export const MovieShow = () => {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="title" />
        <TextField source="description" />
        <TextField source="imageUrl" />
        <TextField source="category" />
        <ScenesList />

        <DateField source="createdAt" />
      </SimpleShowLayout>
    </Show>
  );
};

export default MovieShow;
