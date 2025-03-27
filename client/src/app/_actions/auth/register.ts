'use server';

import { FetchError, handleFetchError } from '@/utils/error';

import { ActionResponse } from '@/types/action';
import { fetchAPI } from '@/libs/api';

type RegisterAction = { email: string; password: string };

export default async function registerAction({
  email,
  password,
}: RegisterAction): Promise<ActionResponse<null>> {
  try {
    await fetchAPI<{ token: string }>(`/auth/register`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    return { status: 200, success: true, message: 'Register successfully', data: null };
  } catch (e) {
    if (e instanceof FetchError) {
      const error = await handleFetchError(e);
      return { status: error.statusCode, success: false, message: error.message, data: null };
    }
    throw new Error();
  }
}
