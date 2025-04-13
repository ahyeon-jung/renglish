'use server';

import { ENV } from '@/constants/env';
import { cookies } from 'next/headers';
import { Configuration, CreateSpeakerDto } from '@/services';
import { SpeakersApi } from '@/services';

export default async function addSpeakerAction(
  sceneId: string,
  addSpeakerActionBody: CreateSpeakerDto,
) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ENV.COOKIE_ACCESS_TOKEN_KEY)?.value;

  
  const api = new SpeakersApi(
    new Configuration({
      basePath: ENV.API_BASE_URL,
      accessToken: token ?? '',
    }),
  );
  const response = await api.speakerControllerCreateSpeaker({
    sceneId: sceneId,
    createSpeakerDto:  addSpeakerActionBody,
  });

  return {
    status: 200,
    success: true,
    message: 'Upload Scene successfully',
    data: response,
  };
}
