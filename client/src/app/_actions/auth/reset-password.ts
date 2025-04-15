'use server';

import { handleError } from '@/utils/error';

import { ActionResponse } from '@/types/action';
import { authApi } from '@/libs/api';

type ResetPasswordActionProps = { email: string; password: string; passwordConfirm: string };

export default async function resetPasswordAction({
  email,
  password,
  passwordConfirm,
}: ResetPasswordActionProps): Promise<ActionResponse<null>> {
  if (!email || !password || !passwordConfirm) {
    return { status: 200, success: false, message: 'no required data', data: null };
  }

  if (password !== passwordConfirm) {
    return {
      status: 200,
      success: false,
      message: 'password and passwordConfirm are not same',
      data: null,
    };
  }

  try {
    await authApi.authControllerPasswordReset({
      passwordResetDto: { email, password },
    });

    return { status: 200, success: true, message: 'Password reset successfully', data: null };
  } catch (e) {
    const err = await handleError(e);
    return { status: err.statusCode, success: false, message: err.message, data: null };
  }
}
