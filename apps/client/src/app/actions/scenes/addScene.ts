"use server";

import { ENV } from "@/constants/env";
import { cookies } from "next/headers";
import { CreateSceneDto } from "@renglish/services";
import { sceneApi } from "@/libs/api";

export default async function addSceneAction(movieId: string, addSceneActionBody: CreateSceneDto) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ENV.COOKIE_ACCESS_TOKEN_KEY)?.value;
  if (!token) {
    return {
      status: 401,
      success: false,
      message: "No Authorization",
      data: null,
    };
  }

  const response = await sceneApi.sceneControllerCreateScene({
    movieId: movieId,
    createSceneDto: addSceneActionBody,
  });

  return {
    status: 200,
    success: true,
    message: "Upload Scene successfully",
    data: response,
  };
}
