'use server';

import { Movie } from '@/types/movie';
import { movieApi } from '@/libs/api';
import { Configuration, MoviesApi, MyApi } from '@renglish/services';
import { ENV } from '@/constants/env';
import { fetchWithToken } from '@/libs/fetchWithToken';

const config = new Configuration({
  basePath: ENV.API_BASE_URL,
  fetchApi: fetchWithToken,
});


export default async function getLatestStudyAction() {
  const myApi = new MoviesApi(config);
  const movie = await movieApi.movieControllerFindLatestScene();

  return {
    status: 200,
    success: true,
    message: 'Fetched successfully',
    data: movie as unknown as Movie,
  };
}
