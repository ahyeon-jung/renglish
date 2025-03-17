import Button from "@/components/Button";
import Field from "@/components/Field";
import Text from "@/components/Text";
import clsx from "clsx";

export default function Login() {
  return (
    <main
      className={clsx(
        "mt-[var(--header-height)] p-3 pt-[100px]",
        "flex flex-col justify-center gap-4"
      )}
    >
      <Text as="h2" typography="display-lg">
        Login
      </Text>
      <div className="flex flex-col gap-2">
        <Field>
          <Field.Label>Email</Field.Label>
          <Field.Input placeholder="ex. renglish@gmail.com" />
        </Field>
        <Field>
          <Field.Label>Password</Field.Label>
          <Field.Input placeholder="ex. 123456" />
        </Field>
      </div>
      <Button>Login</Button>
    </main>
  );
}
