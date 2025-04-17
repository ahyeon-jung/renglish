'use server';

import { ActionResponse } from '@/types/action';
import { authApi } from '@/libs/api';

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
  how = 'no answer',
  provider = 'email',
}: RegisterActionProps): Promise<ActionResponse<null>> {
  if (!email || !password || !nickname) {
    return { status: 200, success: false, message: 'no required data', data: null };
  }

  await authApi.authControllerRegister({
    createUserDto: { email, password, nickname, provider, how },
  });

  return { status: 200, success: true, message: 'Register successfully', data: null };
}
