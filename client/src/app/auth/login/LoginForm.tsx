'use client';

import Button from '@/components/Button';
import Field from '@/components/Field';
import { PATHS } from '@/constants/path';
import loginAction from '@/app/@actions/auth/login';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const INITIAL_LOGIN_BODY = { email: '', password: '' };

export default function LoginForm() {
  const router = useRouter();
  const [loginBody, setLoginBody] = useState(INITIAL_LOGIN_BODY);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await loginAction(loginBody);
      router.push(PATHS.HOME);
    } catch (e) {
      console.log('로그인 실패', e);
    }
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginBody((prev) => ({ ...prev, email: e.target.value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginBody((prev) => ({ ...prev, password: e.target.value }));
  };

  return (
    <form onSubmit={handleLoginSubmit}>
      <div className="flex flex-col gap-2">
        <Field>
          <Field.Label>Email</Field.Label>
          <Field.Input placeholder="ex. renglish@gmail.com" onChange={handleEmailChange} />
        </Field>
        <Field>
          <Field.Label>Password</Field.Label>
          <Field.Input placeholder="ex. 123456" onChange={handlePasswordChange} />
        </Field>
      </div>
      <Button type="submit">Login</Button>
    </form>
  );
}
