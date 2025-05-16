import { List, Datagrid, TextField, DateField } from "react-admin";
import RESOURCE from "../../constants/resource";
import { StudyDto } from "@renglish/services";

const StudyList = () => (
  <List<StudyDto> resource={RESOURCE.STUDIES}>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <TextField source="isCompleted" />
      <TextField source="applicants.length" />
      <TextField source="participants.length" />
      <TextField source="title" />
      <DateField source="studiedAt" />
    </Datagrid>
  </List>
);

export default StudyList;
