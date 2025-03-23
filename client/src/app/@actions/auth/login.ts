'use server';

import { ENV } from '@/constants/env';
import { cookies } from 'next/headers';
import { fetchAPI } from '@/libs/api';

type LoginAction = { email: string; password: string };

export default async function loginAction({ email, password }: LoginAction) {
  const response = await fetchAPI<{ token: string }>(`/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  const {
    data: { token },
  } = response;

  const cookieStore = await cookies();
  cookieStore.set(ENV.ACCESS_TOKEN_KEY, token, {
    httpOnly: true,
    secure: ENV.IS_PRODUCTION,
    path: '/',
  });

  return true;
}
