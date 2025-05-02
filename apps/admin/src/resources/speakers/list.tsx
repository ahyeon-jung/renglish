import { List, Datagrid, TextField, DateField } from 'react-admin'
import RESOURCE from '../../constants/resource'

const SpeakerList = () => (
  <List resource={RESOURCE.SPEAKERS}>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <TextField source="speakerName" />
      <TextField source="speakerType" />
      <DateField source="createdAt" />
    </Datagrid>
  </List>
)

export default SpeakerList