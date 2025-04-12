'use server';

import { ENV } from '@/constants/env';
import { cookies } from 'next/headers';
import { Configuration, MyApi } from '@/services';

export default async function getAuthDataAction() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ENV.COOKIE_ACCESS_TOKEN_KEY)?.value;
  if (!token) {
    return {
      status: 401,
      success: true,
      message: 'No Authorization',
      data: null,
    };
  }

  const api = new MyApi(
    new Configuration({
      basePath: ENV.API_BASE_URL,
      accessToken: token,
    }),
  );

  const response = await api.myControllerFindUserByToken();

  return {
    status: 200,
    success: true,
    message: 'Fetch auth user data successfully',
    data: response,
  };
}
