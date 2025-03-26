'use server';

import { ActionResponse } from '@/types/action';
import { PaginationResponse } from '@/types/api';
import { Scene } from '@/types/scene';
import { fetchAPI } from '@/libs/api';

export default async function getScenes(
  keyword?: string,
): Promise<ActionResponse<PaginationResponse<Scene>>> {
  const params = new URLSearchParams();
  if (keyword) {
    params.append('keyword', keyword);
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
