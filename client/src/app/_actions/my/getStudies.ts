'use server';

import { ENV } from '@/constants/env';
import { cookies } from 'next/headers';
import { Configuration, ListStudyDto, MyApi } from '@/services';

export default async function getStudiesAction(
  type?: 'applicant' | 'participant',
){
  const cookieStore = await cookies();
  const token = cookieStore.get(ENV.COOKIE_ACCESS_TOKEN_KEY)?.value;

  const api = new MyApi(
    new Configuration({
      basePath: ENV.API_BASE_URL,
      accessToken: token,
    }),
  );

  const data = await api.myControllerFindMyStudies({ type });

  return {
    status: 200,
    success: true,
    message: 'Fetch auth user data successfully',
    data: data as unknown as ListStudyDto[],
  };
}
