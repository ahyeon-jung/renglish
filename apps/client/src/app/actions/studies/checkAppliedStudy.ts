"use server";

import { ENV } from "@/constants/env";
import { cookies } from "next/headers";
import { fetchAPI } from "@/libs/api";

type CheckAppliedStudyActionProps = { studyId: string };

export default async function checkAppliedStudyAction({ studyId }: CheckAppliedStudyActionProps) {
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

  const response = await fetchAPI(`/studies/${studyId}/is-member`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return {
    status: 200,
    success: true,
    message: "Apply successfully",
    data: response.data,
  };
}
