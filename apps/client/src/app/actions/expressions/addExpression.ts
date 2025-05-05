"use server";

import { ENV } from "@/constants/env";
import { cookies } from "next/headers";
import { CreateExpressionDto } from "@renglish/services";
import { expressionApi } from "@/libs/api";

export default async function addExpressionAction(
  sceneId: string,
  addExpressionActionBody: CreateExpressionDto,
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

  const response = await expressionApi.expressionControllerCreate({
    sceneId: sceneId,
    createExpressionDto: addExpressionActionBody,
  });

  return {
    status: 200,
    success: true,
    message: "Upload Expression successfully",
    data: response,
  };
}
