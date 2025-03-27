'use server';

import { ActionResponse } from '@/types/action';
import { Scene } from '@/types/scene';
import { fetchAPI } from '@/libs/api';

export default async function deleteScene(sceneId: string): Promise<ActionResponse<null>> {
  await fetchAPI<Scene>(`/scenes/${sceneId}`, {
    method: 'DELETE',
  });

  return {
    status: 200,
    success: true,
    message: 'Delete scenes successfully',
    data: null,
  };
}
