'use server';

import { PaginationParams, PaginationResponse, SearchParams } from '@/types/api';

import { ActionResponse } from '@/types/action';
import { Movie } from '@/types/movie';
import { fetchAPI } from '@/libs/api';

type GetMoviesParams = { category?: string } & SearchParams & PaginationParams;

export default async function getMovies({
  keyword,
  category,
  offset = 1,
  limit = 10,
}: GetMoviesParams): Promise<ActionResponse<PaginationResponse<Movie>>> {
  const params = new URLSearchParams();
  if (keyword) {
    params.append('keyword', keyword);
  }
  if (category) {
    params.append('category', category);
  }
  if (offset) {
    params.append('offset', offset.toString());
  }
  if (limit) {
    params.append('limit', limit.toString());
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
