'use client';

import Button from '@/components/Button';
import Field from '@/components/Field';
import { MESSAGE } from '@/constants/toast';
import { PATHS } from '@/constants/path';
import loginAction from '@/app/_actions/auth/login';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const INITIAL_LOGIN_BODY = { email: '', password: '' };

export default function LoginForm() {
  const router = useRouter();
  const [loginBody, setLoginBody] = useState(INITIAL_LOGIN_BODY);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { success } = await loginAction(loginBody);
      if (!success) {
        toast.error(MESSAGE.AUTH.ERROR.UNMATCHED);
        return;
      }
      router.push(PATHS.HOME);
    } catch {
      toast.error(MESSAGE.COMMON.ERROR.SERVER);
    } finally {
      setLoginBody((prev) => ({ ...prev, password: '' }));
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginBody((prev) => ({ ...prev, email: e.target.value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginBody((prev) => ({ ...prev, password: e.target.value }));
  };

  const isAvailableLoginButton = loginBody.email && loginBody.password;

  return (
    <form onSubmit={handleLoginSubmit}>
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
          <Field.Input
            type="password"
            placeholder="ex. 123456"
            value={loginBody.password}
            onChange={handlePasswordChange}
          />
        </Field>
      </div>
      <Button type="submit" disabled={!isAvailableLoginButton}>
        Login
      </Button>
    </form>
  );
}
