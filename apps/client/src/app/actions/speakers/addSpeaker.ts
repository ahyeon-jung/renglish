'use server';

import { ENV } from '@/constants/env';
import { cookies } from 'next/headers';
import { CreateSpeakerDto } from '@renglish/services';
import { speakerApi } from '@/libs/api';

export default async function addSpeakerAction(
  sceneId: string,
  addSpeakerActionBody: CreateSpeakerDto,
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

  const response = await speakerApi.speakerControllerCreateSpeaker({
    sceneId: sceneId,
    createSpeakerDto: addSpeakerActionBody,
  });

  return {
    status: 200,
    success: true,
    message: 'Upload Scene successfully',
    data: response,
  };
}
