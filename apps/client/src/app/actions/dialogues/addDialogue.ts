"use server";

import { ENV } from "@/constants/env";
import { cookies } from "next/headers";
import { CreateDialogueDto } from "@renglish/services";
import { dialogueApi } from "@/libs/api";

export default async function addDialogueAction(
  sceneId: string,
  speakerId: string,
  addDialogueActionBody: CreateDialogueDto,
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

  await dialogueApi.dialogueControllerCreateDialogue({
    sceneId: sceneId,
    speakerId: speakerId,
    createDialogueDto: addDialogueActionBody,
  });

  return {
    status: 200,
    success: true,
    message: "Upload Scene successfully",
    data: null,
  };
}
