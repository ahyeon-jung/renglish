'use server';

import { ActionResponse } from '@/types/action';
import { cookies } from 'next/headers';
import { fetchAPI } from '@/libs/api';

type AuthUserData = {
  id: string;
  email: string;
};

export default async function getAuthDataAction(): Promise<ActionResponse<AuthUserData>> {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  const response = await fetchAPI<AuthUserData>(`/auth/user`, {
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
