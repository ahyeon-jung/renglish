'use server';

import { handleError } from '@/utils/error';

import { ActionResponse } from '@/types/action';
import { ENV } from '@/constants/env';
import { cookies } from 'next/headers';
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

    const cookieStore = await cookies();
    cookieStore.set(ENV.COOKIE_ACCESS_TOKEN_KEY, accessToken, {
      httpOnly: true,
      secure: ENV.IS_PRODUCTION,
      path: '/',
    });

    cookieStore.set(ENV.COOKIE_REFRESH_TOKEN_KEY, refreshToken, {
      httpOnly: true,
      secure: ENV.IS_PRODUCTION,
      path: '/',
      ...(rememberMe && { maxAge: 1000 * 60 * 60 * 24 * 7 }),
    });

    return { status: 200, success: true, message: 'Login successfully', data: null };
  } catch (e) {
    const err = await handleError(e);
    return { status: err.statusCode, success: false, message: err.message, data: null };
  }
}
