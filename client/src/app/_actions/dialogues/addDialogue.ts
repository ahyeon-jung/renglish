'use server';

import { ENV } from '@/constants/env';
import { cookies } from 'next/headers';
import { Configuration } from '@/services/runtime';
import { CreateDialogueDto, DialoguesApi } from '@/services';

export default async function addDialogueAction(
  sceneId: string,
  speakerId: string,
  addDialogueActionBody: CreateDialogueDto,
) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ENV.COOKIE_ACCESS_TOKEN_KEY)?.value;

  const api = new DialoguesApi(
    new Configuration({
      basePath: ENV.API_BASE_URL,
      accessToken: token ?? '',
    }),
  );
  await api.dialogueControllerCreateDialogue({
    sceneId: sceneId,
    speakerId: speakerId,
    createDialogueDto: addDialogueActionBody,
  });

  return {
    status: 200,
    success: true,
    message: 'Upload Scene successfully',
    data: null,
  };
}
