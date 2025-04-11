'use server';

import { ActionResponse } from '@/types/action';
import { Movie } from '@/types/movie';
import { Configuration, MoviesApi } from '@/services';
import { ENV } from '@/constants/env';

export default async function getMovie(movieId: string): Promise<ActionResponse<Movie>> {
  const api = new MoviesApi(
    new Configuration({
      basePath: ENV.API_BASE_URL,
      accessToken: '',
    }),
  );

  const movie = await api.movieControllerFindOne({movieId})
  
  return {
    status: 200,
    success: true,
    message: 'Fetch movies successfully',
    data: movie as unknown as Movie,
  };
}
