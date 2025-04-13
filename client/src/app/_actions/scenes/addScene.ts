'use server';

import { ENV } from '@/constants/env';
import { cookies } from 'next/headers';
import { CreateSceneDto,  ScenesApi } from '@/services';
import { Configuration } from '@/services';

export default async function addSceneAction(
  movieId: string,
  addSceneActionBody: CreateSceneDto,
) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ENV.COOKIE_ACCESS_TOKEN_KEY)?.value;

  const api = new ScenesApi(
    new Configuration({
      basePath: ENV.API_BASE_URL,
      accessToken: token ?? '',
    }),
  );
  const response = await api.sceneControllerCreateScene({
    movieId: movieId,
    createSceneDto:  addSceneActionBody,
  });

  return {
    status: 200,
    success: true,
    message: 'Upload Scene successfully',
    data: response,
  };
}
