'use server';

import { ENV } from '@/constants/env';
import { cookies } from 'next/headers';

export default async function checkTokenAction() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ENV.COOKIE_ACCESS_TOKEN_KEY)?.value;

  return !!token
}
