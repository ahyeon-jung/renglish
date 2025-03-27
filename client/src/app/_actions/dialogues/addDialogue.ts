'use server';

import { ENV } from '@/constants/env';
import { Scene } from '@/types/scene';
import { cookies } from 'next/headers';
import { fetchAPI } from '@/libs/api';

type AddDialogueActionBody = {
  english_script: string;
  korean_script: string;
  order: number;
};

export default async function addDialogueAction(
  sceneId: string,
  speakerId: string,
  addDialogueActionBody: AddDialogueActionBody,
) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ENV.COOKIE_ACCESS_TOKEN_KEY)?.value;

  const response = await fetchAPI<Scene>(`/dialogues/${sceneId}/${speakerId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(addDialogueActionBody),
  });

  return {
    status: 200,
    success: true,
    message: 'Upload Scene successfully',
    data: response.data,
  };
}
