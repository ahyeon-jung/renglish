'use server';

import { ENV } from '@/constants/env';
import { MovieCategoryType } from '@/constants/movie-category';
import { movieApi } from '@/libs/api';
import { cookies } from 'next/headers';

type AddMovieActionBody = {
  title: string;
  category: MovieCategoryType;
  imageUrl: string;
  description: string;
};

export default async function addMovieAction(addMovieActionBody: AddMovieActionBody) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ENV.COOKIE_ACCESS_TOKEN_KEY)?.value;
  if (!token) {
    return {
      status: 401,
      success: false,
      message: 'No Authorization',
      data: null,
    };
  }

  const response = await movieApi.movieControllerCreate({
    createMovieDto: {
      title: addMovieActionBody.title,
      category: addMovieActionBody.category,
      imageUrl: addMovieActionBody.imageUrl,
      description: addMovieActionBody.description,
    },
  });

  if (!response) {
    return {
      status: 400,
      success: false,
      message: 'Failed to upload movie',
      data: response,
    };
  }

  return {
    status: 200,
    success: true,
    message: 'Upload movie successfully',
    data: response,
  };
}
