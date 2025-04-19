'use server';

import { FetchError, handleFetchError } from '@/utils/error';

import { ActionResponse } from '@/types/action';
import { emailVerificationApi } from '@/libs/api';

type VerifyCodeParams = { email: string; code: string };

export default async function verifyCode({
  email,
  code,
}: VerifyCodeParams): Promise<ActionResponse<null>> {
  if (!email || !code) {
    return { status: 200, success: false, message: 'no required data', data: null };
  }

  try {
    await emailVerificationApi.emailVerificationControllerVerifyCode({
      verifyCodeDto: { email, code },
    });

    return { status: 200, success: true, message: 'Verify code successfully', data: null };
  } catch (e) {
    if (e instanceof FetchError) {
      const error = await handleFetchError(e);
      return { status: error.statusCode, success: false, message: error.message, data: null };
    }
    throw new Error();
  }
}
