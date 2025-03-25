'use server';

import { ActionResponse } from '@/types/action';
import { Scene } from '@/types/scene';
import { fetchAPI } from '@/libs/api';

export default async function getScenes(keyword?: string): Promise<ActionResponse<Scene[]>> {
  const params = new URLSearchParams();
  if (keyword) {
    params.append('keyword', keyword);
  }

  const url = `/scenes?${params.toString()}`;

  const response = await fetchAPI<Scene[]>(url, {
    method: 'GET',
  });

  return {
    status: 200,
    success: true,
    message: 'Fetch scenes successfully',
    data: response.data,
  };
}
