'use server';

import { ENV } from '@/constants/env';
import { StudyType } from '@/types/study';
import { cookies } from 'next/headers';
import { fetchAPI } from '@/libs/api';

type UpdateStudyActionBody = {
  title?: string;
  description?: string;
  studiedAt?: string;
};

export default async function updateStudyAction(
  studyId: string,
  updateStudyActionBody: UpdateStudyActionBody,
) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ENV.COOKIE_ACCESS_TOKEN_KEY)?.value;

  const response = await fetchAPI<StudyType>(`/studies/${studyId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updateStudyActionBody),
  });

  return {
    status: 200,
    success: true,
    message: 'Update study successfully',
    data: response.data,
  };
}
