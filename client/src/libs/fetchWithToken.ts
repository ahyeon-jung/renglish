import { ENV } from '@/constants/env';
import { cookies } from 'next/headers';

export async function fetchWithToken(input: RequestInfo, init?: RequestInit): Promise<Response> {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get(ENV.COOKIE_ACCESS_TOKEN_KEY)?.value;

  const originalResponse = await fetch(input, {
    ...init,
    headers: {
      ...(init?.headers || {}),
      Authorization: `Bearer ${accessToken}`,
    },
    cache: 'force-cache',
  });
  return originalResponse;
}
