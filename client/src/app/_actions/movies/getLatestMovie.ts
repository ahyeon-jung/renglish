'use server';

import { ActionResponse } from '@/types/action';
import { Movie } from '@/types/movie';
import { fetchAPI } from '@/libs/api';

export default async function getLatestMovieAction(): Promise<ActionResponse<Movie>> {
  const response = await fetchAPI<Movie>(`/movies/latest`, {
    method: 'GET',
  });

  return {
    status: 200,
    success: true,
    message: 'Fetch movies successfully',
    data: response.data,
  };
}
