import type { ExtendedSceneDto } from "@renglish/services";
import { Datagrid, DateField, List, TextField } from "react-admin";
import RESOURCE from "../../constants/resource";

const SceneList = () => (
  <List<ExtendedSceneDto> resource={RESOURCE.SCENES}>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <TextField source="title" />
      <DateField source="createdAt" />
    </Datagrid>
  </List>
);

export default SceneList;
