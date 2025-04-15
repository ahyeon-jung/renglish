'use server';

import { handleError } from '@/utils/error';

import { ActionResponse } from '@/types/action';
import { ENV } from '@/constants/env';
import { AuthApi, Configuration } from '@/services';

type LoginAction = { email: string; password: string; rememberMe: boolean };

export default async function loginAction({
  email,
  password,
  rememberMe,
}: LoginAction): Promise<ActionResponse<null>> {
  if (!email || !password) {
    return { status: 200, success: false, message: 'no required data', data: null };
  }

  const api = new AuthApi(
    new Configuration({
      basePath: ENV.API_BASE_URL,
      accessToken: '',
    }),
  );

  try {
    const response = await api.authControllerLogin({
      loginDto: { email, password }
    });

    const { accessToken, refreshToken } = response;

    fetch('/api/cookies/set-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accessToken, refreshToken, rememberMe })
    })

    return { status: 200, success: true, message: 'Login successfully', data: null };
  } catch (e) {
    const err = await handleError(e);
    return { status: err.statusCode, success: false, message: err.message, data: null };
  }
}
