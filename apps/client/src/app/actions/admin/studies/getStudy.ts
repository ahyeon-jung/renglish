"use server";

import { ActionResponse } from "@/types/action";
import { AdminStudyType } from "@/types/study";
import { fetchAPI } from "@/libs/api";

export default async function getStudyAction(
  studyId: string,
): Promise<ActionResponse<AdminStudyType>> {
  const response = await fetchAPI<AdminStudyType>(`/studies/${studyId}`, {
    method: "GET",
  });

  return {
    status: 200,
    success: true,
    message: "Fetch study successfully",
    data: response.data,
  };
}
