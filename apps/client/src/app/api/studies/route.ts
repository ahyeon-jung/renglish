import { Configuration, StudyApi } from '@/services';
import { ENV } from '@/constants/env';

export async function GET(request: Request) {
  const incomingUrl = new URL(request.url);
  const params = incomingUrl.searchParams;

  const offset = Number(params.get('offset') ?? 1);
  const limit = Number(params.get('limit') ?? 10);
  const status = params.get('status') ?? undefined;

  const api = new StudyApi(
    new Configuration({
      basePath: ENV.API_BASE_URL,
      accessToken: '',
    }),
  );

  const response = await api.studyControllerFindAll({
    offset,
    limit,
    status,
  });

  return Response.json(response.data);
}
