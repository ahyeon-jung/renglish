'use server';

import { cookies } from 'next/headers';
import { fetchAPI } from '@/libs/api';

export default async function adminAction() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  const response = await fetchAPI<{ isAdmin: boolean }>(`/auth/check/admin`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const {
    data: { isAdmin },
  } = response;

  return isAdmin;
}
