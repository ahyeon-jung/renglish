import RESOURCE from "../../constants/resource";
import {
  Create,
  SimpleForm,
  TextInput,
  ArrayInput,
  SimpleFormIterator,
  SelectInput,
  useGetList,
} from "react-admin";
import { Typography, Box } from "@mui/material";

const SelectScene = () => {
  const { data } = useGetList(RESOURCE.SCENES);
  return (
    <SelectInput
      source="sceneId"
      choices={data?.map((scene) => ({ id: scene.id, name: scene.title })) || []}
      optionText="name"
      optionValue="id"
    />
  );
};

export default function SpeakerCreate() {
  return (
    <Create resource={RESOURCE.SPEAKERS}>
      <SimpleForm>
        <SelectScene />
        <Box width="100%" mb={2}>
          <Typography variant="h6">발화자 정보</Typography>
          <ArrayInput source="speakers">
            <SimpleFormIterator>
              <TextInput source="speakerName" label="이름" />
              <TextInput source="speakerType" label="타입" />
            </SimpleFormIterator>
          </ArrayInput>
        </Box>
      </SimpleForm>
    </Create>
  );
}
