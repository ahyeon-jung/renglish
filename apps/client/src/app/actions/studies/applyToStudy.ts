"use server";

import { ENV } from "@/constants/env";
import { FetchError } from "@/utils/error";
import { cookies } from "next/headers";
import { studyApi } from "@/libs/api";

type applyToStudyActionProps = { studyId: string };

export default async function applyToStudyAction({ studyId }: applyToStudyActionProps) {
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

  try {
    const response = await studyApi.studyControllerAddApplicant({ studyId });
    return {
      status: 200,
      success: true,
      message: "Apply successfully",
      data: response,
    };
  } catch (e: unknown) {
    const err = e as FetchError;

    const status = err.response?.status ?? 500;
    const message = err.message || "Unexpected error";

    return {
      status,
      success: false,
      message,
      data: null,
    };
  }
}
