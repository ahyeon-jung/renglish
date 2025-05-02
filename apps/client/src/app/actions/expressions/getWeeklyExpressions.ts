'use server';

import { ActionResponse } from '@/types/action';
import { ExpressionType } from '@/types/expression';
import { expressionApi } from '@/libs/api';

export default async function getWeeklyExpressions(): Promise<ActionResponse<ExpressionType[]>> {
  try {
    const response = await expressionApi.expressionControllerFindWeeklyExpressions();
    return {
      status: 200,
      success: true,
      message: 'Fetch WeeklyExpressions successfully',
      data: response,
    };
  } catch {
    return {
      status: 500,
      success: true,
      message: 'Internet Server Error',
      data: [],
    };
  }

}
