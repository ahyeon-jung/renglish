'use server';

import { FetchError, handleFetchError } from '@/utils/error';

import { ActionResponse } from '@/types/action';
import { ENV } from '@/constants/env';
import { cookies } from 'next/headers';
import { fetchAPI } from '@/libs/api';

type LoginAction = { email: string; password: string };

export default async function loginAction({
  email,
  password,
}: LoginAction): Promise<ActionResponse<null>> {
  if (!email || !password) {
    return { status: 200, success: false, message: 'no required data', data: null };
  }

  try {
    const response = await fetchAPI<{ token: string }>(`/auth/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    const {
      data: { token },
    } = response;

    const cookieStore = await cookies();
    cookieStore.set(ENV.COOKIE_ACCESS_TOKEN_KEY, token, {
      httpOnly: true,
      secure: ENV.IS_PRODUCTION,
      path: '/',
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
