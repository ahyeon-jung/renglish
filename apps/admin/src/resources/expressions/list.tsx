import { List, Datagrid, TextField } from 'react-admin'
import RESOURCE from '../../constants/resource'

const ExpressionsList = () => (
  <List resource={RESOURCE.EXPRESSIONS}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="expression" />
      <TextField source="usage" />
    </Datagrid>
  </List>
)

export default ExpressionsList