"use server";

import { ENV } from "@/constants/env";
import { cookies } from "next/headers";
import { sceneApi } from "@/libs/api";

type UpdateSceneActionBody = {
  title?: string;
  description?: string;
  studiedAt?: string;
};

export default async function updateSceneAction(
  sceneId: string,
  updateSceneActionBody: UpdateSceneActionBody,
) {
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

  const response = await sceneApi.sceneControllerUpdateScene({
    sceneId,
    updateSceneDto: updateSceneActionBody,
  });

  return {
    status: 200,
    success: true,
    message: "Upload Scene successfully",
    data: response,
  };
}
