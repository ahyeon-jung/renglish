import { ExtendedSceneDto } from '@renglish/services'
import { List, Datagrid, TextField, DateField } from 'react-admin'
import RESOURCE from '../../constants/resource'

const UserList = () => (
  <List<ExtendedSceneDto> resource={RESOURCE.USERS}>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <TextField source="email" />
      <TextField source="nickname" />
      <TextField source="provider" />
      <DateField source="createdAt" />
    </Datagrid>
  </List>
)

export default UserList;
