'use server';

import { ENV } from '@/constants/env';
import { cookies } from 'next/headers';
import { dialogueApi } from '@/libs/api';

type UpdateDialogueActionBody = {
  englishScript?: string;
  koreanScript?: string;
  order?: number;
};

export default async function updateDialogueAction(
  dialogueId: string,
  updateDialogueActionBody: UpdateDialogueActionBody,
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

  const response = await dialogueApi.dialogueControllerUpdateDialogue({
    dialogueId: dialogueId,
    updateDialogueDto: updateDialogueActionBody,
  });

  return {
    status: 200,
    success: true,
    message: 'Upload Dialogue successfully',
    data: response,
  };
}
