'use server';

import { ENV } from '@/constants/env';
import { cookies } from 'next/headers';
import { CreateExpressionDto, ExpressionApi } from '@/services';
import { Configuration } from '@/services';

export default async function addExpressionAction(
  sceneId: string,
  addExpressionActionBody: CreateExpressionDto,
) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ENV.COOKIE_ACCESS_TOKEN_KEY)?.value;

  const api = new ExpressionApi(
    new Configuration({
      basePath: ENV.API_BASE_URL,
      accessToken: token ?? '',
    }),
  );
  const response = await api.expressionControllerCreate({
    sceneId: sceneId,
    createExpressionDto: addExpressionActionBody,
  });

  return {
    status: 200,
    success: true,
    message: 'Upload Expression successfully',
    data: response,
  };
}
