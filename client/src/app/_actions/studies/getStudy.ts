'use server';

import { studyApi } from '@/libs/api';

export default async function getStudyAction(studyId: string) {
  const data = await studyApi.studyControllerFindOne({ studyId });

  return {
    status: 200,
    success: true,
    message: 'Fetch Studies successfully',
    data,
  };
}
