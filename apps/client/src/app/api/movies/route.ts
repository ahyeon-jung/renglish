import { Configuration, MoviesApi } from "@renglish/services";
import { ENV } from "@/constants/env";

export async function GET(request: Request) {
  const incomingUrl = new URL(request.url);
  const params = incomingUrl.searchParams;

  const offset = Number(params.get("offset") ?? 1);
  const limit = Number(params.get("limit") ?? 10);
  const keyword = params.get("keyword") ?? undefined;
  const category = params.get("category") ?? undefined;

  const api = new MoviesApi(
    new Configuration({
      basePath: ENV.API_BASE_URL,
      accessToken: "",
    }),
  );

  const response = await api.movieControllerFindAll({
    offset,
    limit,
    keyword,
    category,
  });

  return Response.json(response.data);
}
