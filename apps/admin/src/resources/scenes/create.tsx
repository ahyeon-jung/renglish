import { Box, Link, Typography } from "@mui/material";
import {
  Create,
  SelectInput,
  SimpleForm,
  TextInput,
  useGetList,
} from "react-admin";
import RESOURCE from "../../constants/resource";
import { AUDIO_STORAGE_URL, VIDEO_TO_MP3_URL } from "../../constants/url";

const SelectMovie = () => {
  const { data } = useGetList(RESOURCE.MOVIES);
  return (
    <SelectInput
      source="movieId"
      choices={data?.map((movie) => ({ id: movie.id, name: movie.title })) || []}
      optionText="name"
      optionValue="id"
    />
  );
};

export default function SceneCreate() {
  return (
    <Create resource={RESOURCE.SCENES}>
      <SimpleForm>
        <SelectMovie />
        <Box width="100%" mb={2}>
          <Typography variant="h6">장면 정보</Typography>
          <TextInput source="title" />
          <TextInput source="description" />
          <Box my={1}>
            <Link href={VIDEO_TO_MP3_URL} target="_blank" rel="noopener noreferrer" mr={2}>
              음성 추출 바로가기
            </Link>
            <Link href={AUDIO_STORAGE_URL} target="_blank" rel="noopener noreferrer">
              오디오 저장소 바로가기
            </Link>
          </Box>
          <TextInput source="audioUrl" />
        </Box>
      </SimpleForm>
    </Create>
  );
}
