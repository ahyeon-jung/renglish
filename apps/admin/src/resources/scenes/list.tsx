import { ExtendedSceneDto } from '@renglish/services'
import { List, Datagrid, TextField, DateField } from 'react-admin'
import RESOURCE from '../../constants/resource'

const SceneList = () => (
  <List<ExtendedSceneDto> resource={RESOURCE.SCENES}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="title" />
      <DateField source="createdAt" />
    </Datagrid>
  </List>
)

export default SceneList