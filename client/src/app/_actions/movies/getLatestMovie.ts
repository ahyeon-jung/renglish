'use server';

import { Configuration, MoviesApi } from '@/services';
import { ENV } from '@/constants/env';
import { Movie } from '@/types/movie';

export default async function getLatestStudyAction() {
  const api = new MoviesApi(
    new Configuration({
      basePath: ENV.API_BASE_URL,
      accessToken: '',
    }),
  );

  const movie = await api.movieControllerFindLatestScene();

  return {
    status: 200,
    success: true,
    message: 'Fetched successfully',
    data: movie as unknown as Movie,
  };
}
