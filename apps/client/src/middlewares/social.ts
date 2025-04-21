import { PATHS } from "@/constants/path";
import { NextRequest, NextResponse } from "next/server";

export async function hideSocialInformationMiddleware(request: NextRequest) {
  try {
    const url = request.nextUrl.clone();
    const searchParams = url.searchParams;

    const email = searchParams.get('email');
    const nickname = searchParams.get('nickname');
    const provider = searchParams.get('provider');
    const providerId = searchParams.get('providerId');

    if (provider || nickname || email || providerId) {
      const redirectUrl = new URL(url);
      if (provider) {
        redirectUrl.searchParams.delete("provider");
      }
      if (providerId) {
        redirectUrl.searchParams.delete("providerId");
      }
      if (nickname) {
        redirectUrl.searchParams.delete("nickname");
      }
      if (email) {
        redirectUrl.searchParams.delete("email");
      }

      const response = NextResponse.redirect(redirectUrl, { status: 307 });

      if (provider) {
        response.cookies.set("provider", provider, { path: "/" });
      }
      if (providerId) {
        response.cookies.set("providerId", providerId, { path: "/" });
      }
      if (email) {
        response.cookies.set("email", email, { path: "/" });
      }
      if (nickname) {
        response.cookies.set("nickname", nickname, { path: "/" });
      }

      return response;
    }


    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL(PATHS.HOME, request.url));
  }
}