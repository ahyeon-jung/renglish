'use server';

import { ActionResponse } from '@/types/action';
import { ExpressionType } from '@/types/expression';
import { fetchAPI } from '@/libs/api';

export default async function getWeeklyExpressions(): Promise<ActionResponse<ExpressionType[]>> {
  const url = `/expressions/weekly`;
  const response = await fetchAPI<ExpressionType[]>(url, {
    method: 'GET',
  });

  return {
    status: 200,
    success: true,
    message: 'Fetch WeeklyExpressions successfully',
    data: response.data,
  };
}
