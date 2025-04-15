'use server';

import { ENV } from '@/constants/env';
import { cookies } from 'next/headers';
import { myApi } from '@/libs/api';

export default async function getWritingsAction() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ENV.COOKIE_ACCESS_TOKEN_KEY)?.value;
  if (!token) {
    return {
      status: 401,
      success: false,
      message: 'No Authorization',
      data: null,
    };
  }

  const response = await myApi.myControllerFindMyWritings();

  return {
    status: 200,
    success: true,
    message: 'Fetch auth user data successfully',
    data: response,
  };
}
