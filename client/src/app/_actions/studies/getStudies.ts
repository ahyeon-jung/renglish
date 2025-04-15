'use server';

import { PaginationParams } from '@/types/api';
import { studyApi } from '@/libs/api';

type GetStudiesParams = { status: string } & PaginationParams;

export default async function getStudiesAction({
  status,
  offset = 1,
  limit = 10,
}: GetStudiesParams) {
  const data = await studyApi.studyControllerFindAll({ offset, limit, status });

  return {
    status: 200,
    success: true,
    message: 'Fetch Studies successfully',
    data,
  };
}
