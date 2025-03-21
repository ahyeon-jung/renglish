"use server";

import { ActionResponse } from "@/types/action";
import { Movie } from "@/types/script";
import { fetchAPI } from "@/libs/api";

export default async function getMovies(): Promise<ActionResponse<Movie[]>> {
 const response = await fetchAPI<Movie[]>(`/movies`, {
    method: "GET",
  });

  return {status: 200, success: true, message: "Fetch movies successfully", data: response.data};
}
