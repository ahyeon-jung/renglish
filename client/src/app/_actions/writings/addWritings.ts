'use server';

import { FetchError, handleFetchError } from '@/utils/error';

import { ActionResponse } from '@/types/action';
import { fetchAPI } from '@/libs/api';

type AddWritingActionParams = { dialogueId: string; writing: string };

export default async function addWritingAction({
  dialogueId,
  writing,
}: AddWritingActionParams): Promise<ActionResponse<null>> {
  if (!dialogueId || !writing) {
    return { status: 200, success: false, message: 'no required data', data: null };
  }

  try {
    await fetchAPI(`/writings/${dialogueId}`, {
      method: 'POST',
      body: JSON.stringify({ writing }),
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
