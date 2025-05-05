"use client";

import Button from "@/components/Button";
import Checkbox from "@/components/CheckBox";
import Field from "@/components/Field";
import { MESSAGE } from "@/constants/toast";
import { PATHS } from "@/constants/path";
import loginAction from "@/app/actions/auth/login";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUserStore } from "@/stores/userStore";

const INITIAL_LOGIN_BODY = { email: "", password: "", rememberMe: false };

export default function EmailLoginForm() {
  const router = useRouter();
  const { setUserId } = useUserStore();
  const [loginBody, setLoginBody] = useState(INITIAL_LOGIN_BODY);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { success, data } = await loginAction(loginBody);
      if (!success) {
        toast.error(MESSAGE.AUTH.ERROR.UNMATCHED);
        return;
      }
      setUserId(data || "", loginBody.rememberMe);
      router.push(PATHS.HOME);
    } catch {
      toast.error(MESSAGE.COMMON.ERROR.SERVER);
    } finally {
      setLoginBody((prev) => ({ ...prev, password: "" }));
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginBody((prev) => ({ ...prev, email: e.target.value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginBody((prev) => ({ ...prev, password: e.target.value }));
  };

  const handleRememberMeClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginBody((prev) => ({ ...prev, rememberMe: e.target.checked }));
  };

  const isAvailableLoginButton = loginBody.email && loginBody.password;

  return (
    <form className="flex flex-col gap-4" onSubmit={handleLoginSubmit}>
      <div className="flex flex-col gap-2">
        <Field>
          <Field.Label>Email</Field.Label>
          <Field.Input
            type="email"
            placeholder="ex. renglish@gmail.com"
            value={loginBody.email}
            onChange={handleEmailChange}
          />
        </Field>
        <Field>
          <Field.Label>Password</Field.Label>
          <Field.Input type="password" placeholder="ex. 123456" onChange={handlePasswordChange} />
        </Field>
      </div>
      <Checkbox
        id="terms"
        label="Keep me logged in"
        checked={loginBody.rememberMe}
        onChange={handleRememberMeClick}
      />
      <Button type="submit" disabled={!isAvailableLoginButton}>
        Login
      </Button>
    </form>
  );
}
