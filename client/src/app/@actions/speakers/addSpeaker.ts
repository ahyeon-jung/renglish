'use server';

import { ENV } from '@/constants/env';
import { Scene } from '@/types/scene';
import { cookies } from 'next/headers';
import { fetchAPI } from '@/libs/api';

type AddSpeakerActionBody = {
  speaker_name: string;
  speaker_type: string;
};

export default async function addSpeakerAction(
  sceneId: string,
  addSpeakerActionBody: AddSpeakerActionBody,
) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ENV.COOKIE_ACCESS_TOKEN_KEY)?.value;

  const response = await fetchAPI<Scene>(`/speakers/${sceneId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(addSpeakerActionBody),
  });

  return {
    status: 200,
    success: true,
    message: 'Upload Scene successfully',
    data: response.data,
  };
}
