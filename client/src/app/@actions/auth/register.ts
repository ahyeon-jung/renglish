'use server';

import { ActionResponse } from '@/types/action';
import { fetchAPI } from '@/libs/api';

type RegisterAction = { email: string; password: string };

export default async function registerAction({
  email,
  password,
}: RegisterAction): Promise<ActionResponse> {
  await fetchAPI<{ token: string }>(`/auth/register`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  return { status: 200, success: true, message: 'Register successfully' };
}
