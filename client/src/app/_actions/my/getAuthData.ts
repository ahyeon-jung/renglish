'use server';

import { ActionResponse } from '@/types/action';
import { ENV } from '@/constants/env';
import { UserType } from '@/types/user';
import { cookies } from 'next/headers';
import { fetchAPI } from '@/libs/api';

export default async function getAuthDataAction(): Promise<ActionResponse<UserType>> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ENV.COOKIE_ACCESS_TOKEN_KEY)?.value;

  const response = await fetchAPI<UserType>(`/auth/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return {
    status: 200,
    success: true,
    message: 'Fetch auth user data successfully',
    data: response.data,
  };
}
