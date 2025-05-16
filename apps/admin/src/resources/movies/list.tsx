import { ExtendedSceneDto } from "@renglish/services";
import { List, Datagrid, TextField, DateField } from "react-admin";
import RESOURCE from "../../constants/resource";

const MovieList = () => (
  <List<ExtendedSceneDto> resource={RESOURCE.MOVIES}>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="category" />
      <TextField source="scenes.length" />
      <DateField source="createdAt" />
    </Datagrid>
  </List>
);

export default MovieList;
