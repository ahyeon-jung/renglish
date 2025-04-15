'use server';

import { Configuration, StudyApi } from '@/services';
import { ENV } from '@/constants/env';

export default async function getStudyAction(studyId: string) {
  const api = new StudyApi(
    new Configuration({
      basePath: ENV.API_BASE_URL,
      accessToken: '',
    }),
  );

  const data = await api.studyControllerFindOne({ studyId });


  return {
    status: 200,
    success: true,
    message: 'Fetch Studies successfully',
    data,
  };
}
