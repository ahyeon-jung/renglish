import { ExtendedSceneDto } from "@renglish/services";
import { List, Datagrid, TextField, DateField } from "react-admin";
import RESOURCE from "../../constants/resource";

const DialogueList = () => (
  <List<ExtendedSceneDto> resource={RESOURCE.DIALOGUES}>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <TextField source="title" />
      <DateField source="createdAt" />
    </Datagrid>
  </List>
);

export default DialogueList;
