import { ENV } from "@/constants/env";
import { PATHS } from "@/constants/path";
import { authApi } from "@/libs/api";
import { AuthApi, Configuration } from "@/services";
import { NextRequest, NextResponse } from "next/server";

export default async function refreshTokenMiddleware(req: NextRequest, pass: boolean = false) {
  const res = NextResponse.next();
  const originRefreshToken = req.cookies.get(ENV.COOKIE_REFRESH_TOKEN_KEY)?.value;
  const originAccessToken = req.cookies.get(ENV.COOKIE_ACCESS_TOKEN_KEY)?.value;
  console.log('ddddddddddddddddddddddddddddddddddddd')

  if (!originRefreshToken || !originAccessToken) {
    if (pass) {
      return res;
    }
    return NextResponse.redirect(new URL(PATHS.HOME, req.url));
  }

  const isAdmin = await authApi.authControllerCheckValidAccessToken({ accessToken: originAccessToken });

  if (String(isAdmin) === 'false') {
    const config = new Configuration({
      basePath: ENV.API_BASE_URL,
      accessToken: originRefreshToken,
    });

    const authApi = new AuthApi(config);

    const { accessToken, refreshToken } = await authApi.authControllerRefresh();

    res.cookies.set(ENV.COOKIE_ACCESS_TOKEN_KEY, accessToken, {
      httpOnly: true,
      path: "/",
      expires: new Date(Date.now() + 1 * 60 * 60 * 1000),
    });

    res.cookies.set(ENV.COOKIE_REFRESH_TOKEN_KEY, refreshToken, {
      httpOnly: true,
      path: "/",
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
  }

  return res;
}
