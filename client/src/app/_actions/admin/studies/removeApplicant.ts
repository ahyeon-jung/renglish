'use server';

import { ENV } from '@/constants/env';
import { FetchError } from '@/utils/error';
import { cookies } from 'next/headers';
import { fetchAPI } from '@/libs/api';

type RemoveApplicantProps = { studyId: string; userId: string };

export default async function removeApplicantAction({ studyId, userId }: RemoveApplicantProps) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ENV.COOKIE_ACCESS_TOKEN_KEY)?.value;

  if (!token) {
    return {
      status: 401,
      success: true,
      message: 'No Authorization',
      data: null,
    };
  }

  try {
    const response = await fetchAPI(`/studies/${studyId}/remove-applicant/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      status: 200,
      success: true,
      message: 'Apply successfully',
      data: response.data,
    };
  } catch (e: unknown) {
    const err = e as FetchError;

    const status = err.response?.status ?? 500;
    const message = err.message || 'Unexpected error';

    return {
      status,
      success: false,
      message,
      data: null,
    };
  }
}
