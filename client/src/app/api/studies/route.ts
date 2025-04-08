import { PaginationResponse } from '@/types/api';
import { StudyType } from '@/types/study';
import { fetchAPI } from '@/libs/api';

export async function GET(request: Request) {
  const incomingUrl = new URL(request.url);

  const apiUrl = `/${incomingUrl.pathname.split('/')[2]}${incomingUrl.search}`;

  const studiesData = await fetchAPI<PaginationResponse<StudyType[]>>(apiUrl);

  return Response.json(studiesData.data.data);
}
