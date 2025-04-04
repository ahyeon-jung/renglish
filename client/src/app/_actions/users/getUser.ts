'use server';

import { FetchError, handleFetchError } from '@/utils/error';

import { ActionResponse } from '@/types/action';
import { User } from '@/types/user';
import { fetchAPI } from '@/libs/api';

type GetUserByIdParams = { userId: string };
type GetUserByEmailParams = { email: string };

export async function getUserByIdAction({
  userId,
}: GetUserByIdParams): Promise<ActionResponse<User>> {
  const response = await fetchAPI<User>(`/users/${userId}`, {
    method: 'GET',
  });

  return {
    status: 200,
    success: true,
    message: 'Fetch movies successfully',
    data: response.data,
  };
}

export async function getUserByEmailAction({
  email,
}: GetUserByEmailParams): Promise<ActionResponse<User | null>> {
  try {
    const response = await fetchAPI<User>(`/users/email/${email}`, {
      method: 'GET',
    });

    return {
      status: 200,
      success: true,
      message: 'Fetch movies successfully',
      data: response.data,
    };
  } catch (e) {
    if (e instanceof FetchError) {
      const error = await handleFetchError(e);
      return { status: error.statusCode, success: false, message: error.message, data: null };
    }
    throw new Error();
  }
}
