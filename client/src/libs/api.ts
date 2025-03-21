'use server';

import { APIResponse } from '@/types/api';
import { ENV } from '@/constants/env';

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
    throw new Error(`API Error: ${res.status}`);
  }

  return res.json() as Promise<APIResponse<T>>;
}
