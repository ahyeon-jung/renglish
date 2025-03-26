'use server';

import { ActionResponse } from '@/types/action';
import { Movie } from '@/types/movie';
import { PaginationResponse } from '@/types/api';
import { fetchAPI } from '@/libs/api';

type GetMoviesProps = {
  keyword?: string;
};

export default async function getMovies({
  keyword,
}: GetMoviesProps): Promise<ActionResponse<PaginationResponse<Movie>>> {
  const params = new URLSearchParams();
  if (keyword) {
    params.append('keyword', keyword);
  }

  const url = `/movies?${params.toString()}`;
  const response = await fetchAPI<PaginationResponse<Movie>>(url, {
    method: 'GET',
  });

  return {
    status: 200,
    success: true,
    message: 'Fetch movies successfully',
    data: response.data,
  };
}
