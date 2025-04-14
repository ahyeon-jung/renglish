'use server';

import { ENV } from '@/constants/env';
import { cookies } from 'next/headers';
import { Configuration, MyApi } from '@/services';

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
      success: false,
      message: 'No Authorization',
      data: null,
    };
  }

  const api = new MyApi(
    new Configuration({
      basePath: ENV.API_BASE_URL,
      accessToken: token,
    }),
  );


  try {
    const response = await api.myControllerChangeUser({
      updateUserDto: {
        nickname: updateNicknameActionBody.nickname,
      },
    });

    return {
      status: 200,
      success: true,
      message: 'Upload nickname successfully',
      data: response,
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
