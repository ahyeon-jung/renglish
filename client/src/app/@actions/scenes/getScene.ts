'use server';

import { ActionResponse } from '@/types/action';
import { MovieScene } from '@/types/script';
import { fetchAPI } from '@/libs/api';

export default async function getScene(sceneId: string): Promise<ActionResponse<MovieScene>> {
  const response = await fetchAPI<MovieScene>(`/scenes/${sceneId}`, {
    method: 'GET',
  });

  return {
    status: 200,
    success: true,
    message: 'Fetch scenes successfully',
    data: response.data,
  };
}
