'use server';

import { ENV } from '@/constants/env';
import { Scene } from '@/types/scene';
import { cookies } from 'next/headers';
import { fetchAPI } from '@/libs/api';

type UpdateSceneActionBody = {
  title?: string;
  description?: string;
  studiedAt?: string;
};

export default async function updateSceneAction(
  sceneId: string,
  updateSceneActionBody: UpdateSceneActionBody,
) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ENV.COOKIE_ACCESS_TOKEN_KEY)?.value;

  const response = await fetchAPI<Scene>(`/scenes/${sceneId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updateSceneActionBody),
  });

  return {
    status: 200,
    success: true,
    message: 'Upload Scene successfully',
    data: response.data,
  };
}
