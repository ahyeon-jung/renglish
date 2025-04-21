'use server';

import { ActionResponse } from '@/types/action';
import { authApi } from '@/libs/api';
import { cookies } from 'next/headers';

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


export type SocialRegisterActionProps = {
  nickname: string;
  how?: string;
};

export async function socialRegisterAction({
  nickname,
  how = 'no answer',
}: SocialRegisterActionProps): Promise<ActionResponse<null>> {
  const cookieStore = await cookies();
  const email = cookieStore.get('email')?.value;
  const provider = cookieStore.get('provider')?.value;
  const providerId = cookieStore.get('providerId')?.value;

  if (!nickname || !provider || !providerId || !email) {
    return { status: 200, success: false, message: 'no required data', data: null };
  }

  await authApi.authControllerRegister({
    createUserDto: { email, password: providerId, nickname, provider, how },
  });

  return { status: 200, success: true, message: 'Register successfully', data: null };
}
