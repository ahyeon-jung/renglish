'use server';

import { FetchError, handleFetchError } from '@/utils/error';

import { ActionResponse } from '@/types/action';
import { ENV } from '@/constants/env';
import { cookies } from 'next/headers';
import { fetchAPI } from '@/libs/api';

type LoginAction = { email: string; password: string; rememberMe: boolean };

export default async function loginAction({
  email,
  password,
  rememberMe,
}: LoginAction): Promise<ActionResponse<null>> {
  if (!email || !password) {
    return { status: 200, success: false, message: 'no required data', data: null };
  }

  try {
    const response = await fetchAPI<{ accessToken: string; refreshToken: string }>(`/auth/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    const {
      data: { accessToken, refreshToken },
    } = response;

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
    if (e instanceof FetchError) {
      const error = await handleFetchError(e);
      return { status: error.statusCode, success: false, message: error.message, data: null };
    }
    throw new Error();
  }
}
