"use server";

import { PaginationParams, SearchParams } from "@/types/api";
import { sceneApi } from "@/libs/api";

type GetScenesParams = SearchParams & PaginationParams;

export default async function getScenes({ offset = 1, limit = 10 }: GetScenesParams) {
  const params = new URLSearchParams();
  if (offset) {
    params.append("offset", offset.toString());
  }
  if (limit) {
    params.append("limit", limit.toString());
  }

  const data = await sceneApi.sceneControllerFindAllScene({ offset, limit });

  return {
    status: 200,
    success: true,
    message: "Fetch scenes successfully",
    data,
  };
}
