import {
  Create,
  SimpleForm,
  TextInput,
  DateInput,
  SelectInput,
  useGetList,
} from "react-admin";
import { Typography } from "@mui/material";
import RESOURCE from "../../constants/resource";

const SelectScene = () => {
  const { data } = useGetList(RESOURCE.SCENES);
  return (
    <SelectInput source="sceneId" choices={data?.map((scene) => ({ id: scene.id, name: scene.title })) || []} optionText="name" optionValue="id" />
  )
}

export const StudyCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <Typography variant="h6" gutterBottom>
          Create New Study
        </Typography>
        <TextInput source="title" fullWidth />
        <TextInput source="description" multiline fullWidth />
        <DateInput source="studiedAt" />
        <SelectScene />
      </SimpleForm>
    </Create>
  );
};

export default StudyCreate;
