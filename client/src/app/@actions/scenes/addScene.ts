'use server';

import { ENV } from '@/constants/env';
import { Scene } from '@/types/scene';
import { cookies } from 'next/headers';
import { fetchAPI } from '@/libs/api';

type AddSceneActionBody = {
  title: string;
  description: string;
};

export default async function addSceneAction(
  movieId: string,
  addSceneActionBody: AddSceneActionBody,
) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ENV.COOKIE_ACCESS_TOKEN_KEY)?.value;

  const response = await fetchAPI<Scene>(`/scenes/${movieId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(addSceneActionBody),
  });

  return {
    status: 200,
    success: true,
    message: 'Upload Scene successfully',
    data: response.data,
  };
}
