'use server';

import { FetchError, handleFetchError } from '@/utils/error';

import { ActionResponse } from '@/types/action';
import { fetchAPI } from '@/libs/api';
import { getUserByEmailAction } from '../users/getUser';

export type RegisterActionProps = {
  email: string;
  password: string;
  nickname: string;
  how?: string;
};

export default async function registerAction({
  email,
  password,
  how,
  nickname,
}: RegisterActionProps): Promise<ActionResponse<null>> {
  if (!email || !password || !nickname) {
    return { status: 200, success: false, message: 'no required data', data: null };
  }

  try {
    const { data: user } = await getUserByEmailAction({ email });
    if (user) {
      return { status: 409, success: false, message: 'Already exists email', data: null };
    }

    await fetchAPI(`/auth/register`, {
      method: 'POST',
      body: JSON.stringify({ email, password, nickname, how }),
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
