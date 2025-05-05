import Field from "@/components/Field";
import { formatDate } from "@/utils/format";

type CreatedDateProps = { createdAt: string };

export default function CreatedDate({ createdAt }: CreatedDateProps) {
  return (
    <div className="flex justify-between">
      <Field>
        <Field.Label>CreatedDate</Field.Label>
        <div>{formatDate(createdAt)}</div>
      </Field>
    </div>
  );
}
