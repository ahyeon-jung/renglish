"use server";

import { ActionResponse } from "@/types/action";
import { sceneApi } from "@/libs/api";
import { cookies } from "next/headers";
import { ENV } from "@/constants/env";

export default async function deleteScene(sceneId: string): Promise<ActionResponse<null>> {
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

  await sceneApi.sceneControllerDeleteScene({ sceneId });

  return {
    status: 200,
    success: true,
    message: "Delete scenes successfully",
    data: null,
  };
}
