"use server";

import { PaginationParams, PaginationResponse, SearchParams } from "@/types/api";

import { ActionResponse } from "@/types/action";
import { Movie } from "@/types/movie";
import { movieApi } from "@/libs/api";

type GetMoviesParams = { category?: string } & SearchParams & PaginationParams;

export default async function getMovies({
  keyword,
  category,
  offset = 1,
  limit = 10,
}: GetMoviesParams): Promise<ActionResponse<PaginationResponse<Movie>>> {
  const response = await movieApi.movieControllerFindAll({ offset, limit, category, keyword });

  return {
    status: 200,
    success: true,
    message: "Fetch movies successfully",
    data: response as unknown as PaginationResponse<Movie>,
  };
}
