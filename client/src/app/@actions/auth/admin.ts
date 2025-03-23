'use server';

import { fetchAPI } from '@/libs/api';

export default async function adminAction() {
  const response = await fetchAPI<{ isAdmin: boolean }>(`/auth/login`, {
    method: 'GET',
  });

  const {
    data: { isAdmin },
  } = response;

  return isAdmin;
}
