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
