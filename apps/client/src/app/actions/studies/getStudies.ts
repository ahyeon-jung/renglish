"use server";

import { PaginationParams } from "@/types/api";
import { studyApi } from "@/libs/api";
import { Configuration } from "@renglish/services";
import { StudyApi } from "@renglish/services";
import { ENV } from "@/constants/env";
import { fetchWithToken } from "@/libs/fetchWithToken";

type GetStudiesParams = { status?: string } & PaginationParams;

export default async function getStudiesAction({
  status,
  offset = 1,
  limit = 10,
}: GetStudiesParams) {
  const config = new Configuration({
    basePath: ENV.API_BASE_URL,
    fetchApi: fetchWithToken,
  });
  const studyApi = new StudyApi(config);

  const data = await studyApi.studyControllerFindAll({ offset, limit, status });

  return {
    status: 200,
    success: true,
    message: "Fetch Studies successfully",
    data,
  };
}
