'use server';

import { Movie } from '@/types/movie';
import { movieApi } from '@/libs/api';

export default async function getLatestStudyAction() {
  const movie = await movieApi.movieControllerFindLatestScene();

  return {
    status: 200,
    success: true,
    message: 'Fetched successfully',
    data: movie as unknown as Movie,
  };
}
