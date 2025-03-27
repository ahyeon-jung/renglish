import { Movie } from '@/types/movie';
import { PaginationResponse } from '@/types/api';
import { fetchAPI } from '@/libs/api';

export async function GET(request: Request) {
  const incomingUrl = new URL(request.url);

  const apiUrl = `/${incomingUrl.pathname.split('/')[2]}${incomingUrl.search}`;

  const moviesData = await fetchAPI<PaginationResponse<Movie[]>>(apiUrl);

  return Response.json(moviesData.data.data);
}
