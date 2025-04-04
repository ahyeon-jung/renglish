'use server';

import { PaginationParams, PaginationResponse, SearchParams } from '@/types/api';

import { ActionResponse } from '@/types/action';
import { Scene } from '@/types/scene';
import { fetchAPI } from '@/libs/api';

type GetScenesParams = SearchParams & PaginationParams;

export default async function getScenes({
  keyword,
  offset = 1,
  limit = 10,
}: GetScenesParams): Promise<ActionResponse<PaginationResponse<Scene>>> {
  const params = new URLSearchParams();
  if (keyword) {
    params.append('keyword', keyword);
  }
  if (offset) {
    params.append('offset', offset.toString());
  }
  if (limit) {
    params.append('limit', limit.toString());
  }

  const url = `/scenes?${params.toString()}`;

  const response = await fetchAPI<PaginationResponse<Scene>>(url, {
    method: 'GET',
  });

  return {
    status: 200,
    success: true,
    message: 'Fetch scenes successfully',
    data: response.data,
  };
}
