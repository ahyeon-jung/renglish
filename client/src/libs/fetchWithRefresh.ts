import { ENV } from '@/constants/env';
import { cookies } from 'next/headers';

export async function fetchWithAutoRefresh(
  input: RequestInfo,
  init?: RequestInit,
): Promise<Response> {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get(ENV.COOKIE_ACCESS_TOKEN_KEY)?.value;
  const refreshToken = cookieStore.get(ENV.COOKIE_REFRESH_TOKEN_KEY)?.value;

  const originalResponse = await fetch(input, {
    ...init,
    headers: {
      ...(init?.headers || {}),
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (originalResponse.status !== 401 || !refreshToken) {
    return originalResponse;
  }

  const refreshRes = await fetch(`${ENV.API_BASE_URL}/auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  if (!refreshRes.ok) {
    return originalResponse;
  }

  const { accessToken: newAccessToken } = await refreshRes.json();

  return fetch(input, {
    ...init,
    headers: {
      ...(init?.headers || {}),
      Authorization: `Bearer ${newAccessToken}`,
    },
  });
}
