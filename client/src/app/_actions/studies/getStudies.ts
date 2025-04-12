'use server';

import { PaginationParams} from '@/types/api';
import { Configuration, StudyApi } from '@/services';
import { ENV } from '@/constants/env';

type GetStudiesParams = { status: string } & PaginationParams;

export default async function getStudiesAction({
  status,
  offset = 1,
  limit = 10,
}: GetStudiesParams) {
  const api = new StudyApi(
    new Configuration({
      basePath: ENV.API_BASE_URL,
      accessToken: '',
    }),
  );

  const data = await api.studyControllerFindAll({ offset, limit, status });


  return {
    status: 200,
    success: true,
    message: 'Fetch Studies successfully',
    data,
  };
}
