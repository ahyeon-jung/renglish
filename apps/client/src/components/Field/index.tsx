import FieldContainer from "./FieldContainer";
import FieldDate from "./FieldDate";
import FieldInput from "./FieldInput";
import FieldInputWithButton from "./FieldInputWithButton";
import FieldLabel from "./FieldLabel";
import FieldMessage from "./FieldMessage";
import FieldSelect from "./FieldSelect";
import FieldTextarea from "./FieldTextarea";

function Field({ children }: React.PropsWithChildren) {
  return <FieldContainer>{children}</FieldContainer>;
}

Field.Input = FieldInput;
Field.InputWithButton = FieldInputWithButton;
Field.Textarea = FieldTextarea;
Field.Message = FieldMessage;
Field.Label = FieldLabel;
Field.Select = FieldSelect;
Field.Date = FieldDate;

export default Field;
