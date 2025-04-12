'use server';

import { FetchError, handleFetchError } from '@/utils/error';

import { ActionResponse } from '@/types/action';
import { fetchAPI } from '@/libs/api';
import { getUserByEmailAction } from '../users/getUser';
import { AuthApi, Configuration } from '@/services';
import { ENV } from '@/constants/env';

export type RegisterActionProps = {
  email: string;
  password: string;
  nickname: string;
  how?: string;
  provider?: string;
};

export default async function registerAction({
  email,
  password,
  nickname,
  how = "no answer",
  provider = "email",
}: RegisterActionProps): Promise<ActionResponse<null>> {
  if (!email || !password || !nickname) {
    return { status: 200, success: false, message: 'no required data', data: null };
  }

  const api = new AuthApi(
    new Configuration({
      basePath: ENV.API_BASE_URL,
      accessToken: '',
    }),
  );

 await api.authControllerRegister({createUserDto: {email, password, nickname, provider, how}});

  return { status: 200, success: true, message: 'Register successfully', data: null };
}
