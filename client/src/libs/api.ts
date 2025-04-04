'use server';

import { APIResponse } from '@/types/api';
import { ENV } from '@/constants/env';
import { FetchError } from '@/utils/error';

export async function fetchAPI<T = void>(endpoint: string, options?: RequestInit) {
  const baseURL = ENV.API_BASE_URL;

  const res = await fetch(`${baseURL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!res.ok) {
    const errorMessage = `Request failed with status ${res.status}: ${res.statusText}`;
    throw new FetchError(errorMessage, res);
  }

  return res.json() as Promise<APIResponse<T>>;
}
