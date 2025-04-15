"use server";

import { ENV } from "@/constants/env";
import { Configuration, StudyApi } from "@/services";
import { cookies } from "next/headers";

export default async function completeStudyAction(studyId: string) {
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

  const api = new StudyApi(
    new Configuration({
      basePath: ENV.API_BASE_URL,
      accessToken: token,
    }),
  );

  const data = await api.studyControllerCompleteStudy({ studyId });

  return {
    status: 200,
    success: true,
    message: 'Study completed',
    data,
  };
}

