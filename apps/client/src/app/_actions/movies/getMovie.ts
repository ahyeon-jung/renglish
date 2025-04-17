'use server';

import { ActionResponse } from '@/types/action';
import { Movie } from '@/types/movie';
import { movieApi } from '@/libs/api';

export default async function getMovie(movieId: string): Promise<ActionResponse<Movie>> {
  const movie = await movieApi.movieControllerFindOne({ movieId });

  return {
    status: 200,
    success: true,
    message: 'Fetch movies successfully',
    data: movie as unknown as Movie,
  };
}
