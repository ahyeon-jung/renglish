'use server';

import { PaginationParams, PaginationResponse, SearchParams } from '@/types/api';

import { ActionResponse } from '@/types/action';
import { StudyType } from '@/types/study';
import { fetchAPI } from '@/libs/api';

type GetStudiesParams = SearchParams & PaginationParams;

export default async function getStudiesAction({
  offset = 1,
  limit = 10,
}: GetStudiesParams): Promise<ActionResponse<PaginationResponse<StudyType>>> {
  const params = new URLSearchParams();

  if (offset) {
    params.append('offset', offset.toString());
  }
  if (limit) {
    params.append('limit', limit.toString());
  }

  const url = `/studies?${params.toString()}`;
  const response = await fetchAPI<PaginationResponse<StudyType>>(url, {
    method: 'GET',
  });

  return {
    status: 200,
    success: true,
    message: 'Fetch Studies successfully',
    data: response.data,
  };
}
