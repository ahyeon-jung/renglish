"use server";

import { movieApi } from "@/libs/api";
import { ActionResponse } from "@/types/action";
import { Movie } from "@/types/movie";

export default async function getLatestMovieAction(): Promise<ActionResponse<Movie[]>> {
  const movies = await movieApi.movieControllerFindLatestScene({ limit: 5 });

  return {
    status: 200,
    success: true,
    message: "Fetched successfully",
    data: movies as unknown as Movie[],
  };
}
