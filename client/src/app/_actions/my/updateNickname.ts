'use server';

import { ENV } from '@/constants/env';
import { cookies } from 'next/headers';
import { fetchAPI } from '@/libs/api';

type UpdateNicknameActionBody = {
  nickname?: string;
};

export default async function updateNicknameAction(
  updateNicknameActionBody: UpdateNicknameActionBody,
) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ENV.COOKIE_ACCESS_TOKEN_KEY)?.value;

  if (!token) {
    return {
      status: 401,
      success: true,
      message: 'No Authorization',
      data: null,
    };
  }

  try {
    const response = await fetchAPI(`/auth/user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateNicknameActionBody),
    });

    return {
      status: 200,
      success: true,
      message: 'Upload nickname successfully',
      data: response.data,
    };
  } catch (e) {
    return {
      status: 500,
      success: false,
      data: null,
      message: e instanceof Error ? e.message : 'Unknown error',
    };
  }
}
