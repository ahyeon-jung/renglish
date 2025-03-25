'use server';

import { ENV } from '@/constants/env';
import { Movie } from '@/types/script';
import { cookies } from 'next/headers';
import { fetchAPI } from '@/libs/api';

type AddMovieActionBody = {
  title: string;
  imageUrl: string;
  description: string;
};

export default async function addMovieAction(addMovieActionBody: AddMovieActionBody) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ENV.COOKIE_ACCESS_TOKEN_KEY)?.value;

  const response = await fetchAPI<Movie>(`/movies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(addMovieActionBody),
  });

  return {
    status: 200,
    success: true,
    message: 'Upload movie successfully',
    data: response.data,
  };
}
