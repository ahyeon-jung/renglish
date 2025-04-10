'use server';

import { ActionResponse } from '@/types/action';
import { ENV } from '@/constants/env';
import { StudyType } from '@/types/study';
import { cookies } from 'next/headers';
import { fetchAPI } from '@/libs/api';

export default async function getStudiesAction(
  type?: 'applicant' | 'participant',
): Promise<ActionResponse<StudyType[]>> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ENV.COOKIE_ACCESS_TOKEN_KEY)?.value;

  let url = '/my/studies';

  if (type) {
    url += `?type=${type}`;
  }
  const response = await fetchAPI<StudyType[]>(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return {
    status: 200,
    success: true,
    message: 'Fetch auth user data successfully',
    data: response.data,
  };
}
