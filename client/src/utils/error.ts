export class FetchError extends Error {
  response: Response;

  constructor(message: string, response: Response) {
    super(message);
    this.name = 'FetchError';
    this.response = response;
  }
}

export async function handleFetchError(e: FetchError) {
  const error = (await e.response.json()) as {
    statusCode: number;
    timestamp: Date;
    path: string;
    message: string;
  };

  return error;
}

export async function handleError(e: unknown): Promise<{
  statusCode: number;
  message: string;
  path?: string;
}> {
  if (
    typeof e === 'object' &&
    e !== null &&
    'response' in e &&
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    typeof (e as any).response?.json === 'function'
  ) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res = await (e as any).response.json();
      return {
        statusCode: res.statusCode ?? 500,
        message: Array.isArray(res.message)
          ? res.message.join(', ')
          : (res.message ?? '서버 오류 발생'),
        path: res.path,
      };
    } catch {
      return {
        statusCode: 500,
        message: '에러 응답을 파싱할 수 없습니다.',
      };
    }
  }

  return {
    statusCode: 500,
    message: (e as Error).message || '알 수 없는 에러가 발생했습니다.',
  };
}
