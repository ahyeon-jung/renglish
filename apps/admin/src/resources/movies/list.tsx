import { ExtendedSceneDto } from '@renglish/services'
import { List, Datagrid, TextField, DateField } from 'react-admin'
import RESOURCE from '../../constants/resource'

const MovieList = () => (
  <List<ExtendedSceneDto> resource={RESOURCE.MOVIES}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="title" />
      <DateField source="createdAt" />
    </Datagrid>
  </List>
)

export default MovieList