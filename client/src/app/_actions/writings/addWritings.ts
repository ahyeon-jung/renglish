'use server';

import { FetchError, handleFetchError } from '@/utils/error';

import { ActionResponse } from '@/types/action';
import { writingApi } from '@/libs/api';
import { cookies } from 'next/headers';
import { ENV } from '@/constants/env';

type AddWritingActionParams = { dialogueId: string; writing: string };

export default async function addWritingAction({
  dialogueId,
  writing,
}: AddWritingActionParams): Promise<ActionResponse<null>> {
  if (!dialogueId || !writing) {
    return { status: 200, success: false, message: 'no required data', data: null };
  }

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

  try {
    await writingApi.writingControllerCreate({
      dialogueId: dialogueId,
      createWritingDto: { writing },
    });

    return {
      status: 200,
      success: true,
      message: 'Save dialogue writing successfully',
      data: null,
    };
  } catch (e) {
    if (e instanceof FetchError) {
      const error = await handleFetchError(e);
      return { status: error.statusCode, success: false, message: error.message, data: null };
    }
    throw new Error();
  }
}
