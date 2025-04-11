'use server';

import { ENV } from '@/constants/env';
import { MovieCategoryType } from '@/constants/movie-category';
import { cookies } from 'next/headers';
import { Configuration, MoviesApi } from '@/services';

type AddMovieActionBody = {
  title: string;
  category: MovieCategoryType;
  imageUrl: string;
  description: string;
};

export default async function addMovieAction(addMovieActionBody: AddMovieActionBody) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ENV.COOKIE_ACCESS_TOKEN_KEY)?.value;

  const api = new MoviesApi(
    new Configuration({
      basePath: ENV.API_BASE_URL,
      accessToken: token ?? "",
    }),
  );

  const response = await api.movieControllerCreate({
    createMovieDto: {
      title: addMovieActionBody.title,
      category: addMovieActionBody.category,
      imageUrl: addMovieActionBody.imageUrl,
      description: addMovieActionBody.description,
    },
  });

  if (!response){
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
