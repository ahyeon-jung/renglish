'use server';

import { ActionResponse } from '@/types/action';
import { ENV } from '@/constants/env';
import { ExpressionType } from '@/types/expression';
import { cookies } from 'next/headers';
import { fetchAPI } from '@/libs/api';

type GetExpressionsBySceneProps = { sceneId: string };
export default async function getExpressionsByScene({
  sceneId,
}: GetExpressionsBySceneProps): Promise<ActionResponse<ExpressionType[] | null>> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ENV.COOKIE_ACCESS_TOKEN_KEY)?.value;
  if (!token) {
    return {
      status: 401,
      success: true,
      message: 'no authorization',
      data: null,
    };
  }

  const url = `/expressions/${sceneId}`;

  const response = await fetchAPI<ExpressionType[]>(url, {
    method: 'GET',
  });

  return {
    status: 200,
    success: true,
    message: 'Fetch expressions successfully',
    data: response.data,
  };
}
