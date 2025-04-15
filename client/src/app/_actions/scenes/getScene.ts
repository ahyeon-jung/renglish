'use server';

import { ActionResponse } from '@/types/action';
import { Scene } from '@/types/scene';
import { sceneApi } from '@/libs/api';

export default async function getScene(sceneId: string): Promise<ActionResponse<Scene>> {
  const scene = await sceneApi.sceneControllerFindSceneById({ sceneId });

  return {
    status: 200,
    success: true,
    message: 'Fetch scenes successfully',
    data: scene as unknown as Scene,
  };
}
