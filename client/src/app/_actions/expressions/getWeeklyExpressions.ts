'use server';

import { ActionResponse } from '@/types/action';
import { ExpressionType } from '@/types/expression';
import { Configuration, ExpressionApi } from '@/services';
import { ENV } from '@/constants/env';

export default async function getWeeklyExpressions(): Promise<ActionResponse<ExpressionType[]>> {
  const api = new ExpressionApi(
    new Configuration({
      basePath: ENV.API_BASE_URL,
      accessToken: '',
    }),
  );
  const response = await api.expressionControllerFindWeeklyExpressions();
  return {
    status: 200,
    success: true,
    message: 'Fetch WeeklyExpressions successfully',
    data: response,
  };
}
