import Field from '@/components/Field';
import { UserType } from '@/types/user';

type EmailProps = Pick<UserType, 'email'>;

export default function Email({ email }: EmailProps) {
  return (
    <div className="flex justify-between">
      <Field>
        <Field.Label>Email</Field.Label>
        <div>{email}</div>
      </Field>
    </div>
  );
}
