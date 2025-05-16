import { Suspense } from "react";
import LoginPage from "./Login";

export default function Login() {
  return (
    <Suspense>
      <LoginPage />
    </Suspense>
  );
}
