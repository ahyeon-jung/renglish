'use server';

import { ENV } from '@/constants/env';
import { cookies } from 'next/headers';

export default async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(ENV.COOKIE_ACCESS_TOKEN_KEY);
  cookieStore.delete(ENV.COOKIE_REFRESH_TOKEN_KEY);

  return { status: 200, success: true, message: 'Logout successfully', data: null };
}