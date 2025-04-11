'use server';

import { ActionResponse } from '@/types/action';
import { Scene } from '@/types/scene';
import { Configuration } from '@/services';
import { ScenesApi } from '@/services';
import { ENV } from '@/constants/env';
import { cookies } from 'next/headers';

export default async function getScene(sceneId: string): Promise<ActionResponse<Scene>> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ENV.COOKIE_ACCESS_TOKEN_KEY)?.value;

  const api = new ScenesApi(
    new Configuration({
      basePath: ENV.API_BASE_URL,
      accessToken: token ?? "",
    }),
  );

  const scene = await api.sceneControllerFindSceneById({sceneId});
  
  return {
    status: 200,
    success: true,
    message: 'Fetch scenes successfully',
    data: scene as unknown as Scene
  };
}
