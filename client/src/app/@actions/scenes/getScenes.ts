'use server';

import { ActionResponse } from '@/types/action';
import { Scene } from '@/types/scene';
import { fetchAPI } from '@/libs/api';

export default async function getScenes(): Promise<ActionResponse<Scene[]>> {
  const response = await fetchAPI<Scene[]>(`/scenes`, {
    method: 'GET',
  });

  return {
    status: 200,
    success: true,
    message: 'Fetch scenes successfully',
    data: response.data,
  };
}
