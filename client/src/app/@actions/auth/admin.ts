'use server';

import { ENV } from '@/constants/env';
import { cookies } from 'next/headers';
import { fetchAPI } from '@/libs/api';

export default async function adminAction() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ENV.ACCESS_TOKEN_KEY)?.value;

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
  } catch {
    return false;
  }
}
