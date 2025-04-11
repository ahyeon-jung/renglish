'use server';

import { PaginationParams, PaginationResponse } from '@/types/api';

import { ActionResponse } from '@/types/action';
import { StudyType } from '@/types/study';
import { Configuration, StudyApi } from '@/services';
import { ENV } from '@/constants/env';

type GetStudiesParams = { status: string } & PaginationParams;

export default async function getStudiesAction({
  status,
  offset = 1,
  limit = 10,
}: GetStudiesParams): Promise<ActionResponse<PaginationResponse<StudyType>>> {
  const api = new StudyApi(
    new Configuration({
      basePath: ENV.API_BASE_URL,
      accessToken: '',
    }),
  );

  const response = await api.studyControllerFindAllRaw({offset, limit, status});

  const data = await response.raw?.json?.();

  return {
    status: 200,
    success: true,
    message: 'Fetch Studies successfully',
    data,
  };
}
