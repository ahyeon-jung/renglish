import FieldContainer from './FieldContainer';
import FieldInput from './FieldInput';
import FieldLabel from './FieldLabel';
import FieldSelect from './FieldSelect';

function Field({ children }: React.PropsWithChildren) {
  return <FieldContainer>{children}</FieldContainer>;
}

Field.Input = FieldInput;
Field.Label = FieldLabel;
Field.Select = FieldSelect;

export default Field;
