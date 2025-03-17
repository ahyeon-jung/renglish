import FieldContainer from "./FieldContainer";
import FieldInput from "./FieldInput";
import FieldLabel from "./FieldLabel";

function Field({ children }: React.PropsWithChildren) {
  return <FieldContainer>{children}</FieldContainer>;
}

Field.Input = FieldInput;
Field.Label = FieldLabel;

export default Field;
