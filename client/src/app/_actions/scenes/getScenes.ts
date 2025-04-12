'use server';

import { PaginationParams, SearchParams } from '@/types/api';

import { Configuration } from '@/services';
import { ScenesApi } from '@/services';
import { ENV } from '@/constants/env';

type GetScenesParams = SearchParams & PaginationParams;

export default async function getScenes({
  offset = 1,
  limit = 10,
}: GetScenesParams){
  const params = new URLSearchParams();
  if (offset) {
    params.append('offset', offset.toString());
  }
  if (limit) {
    params.append('limit', limit.toString());
  }

  const api = new ScenesApi(
    new Configuration({
      basePath: ENV.API_BASE_URL,
      accessToken: '',
    }),
  );

  const data = await api.sceneControllerFindAllScene({ offset, limit });

  return {
    status: 200,
    success: true,
    message: 'Fetch scenes successfully',
    data,
  };
}
