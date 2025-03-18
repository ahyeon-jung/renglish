import LoginForm from "./LoginForm";
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
      <LoginForm />
    </main>
  );
}
