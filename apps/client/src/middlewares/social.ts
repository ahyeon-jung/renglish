import { PATHS } from "@/constants/path";
import { NextRequest, NextResponse } from "next/server";

export async function hideSocialInformationMiddleware(request: NextRequest) {
  try {
    const url = request.nextUrl.clone();
    const searchParams = url.searchParams;

    const cookieKeys = ["provider", "providerId", "email", "nickname"];
    const cookieData: Record<string, string> = {};

    let shouldRedirect = false;

    for (const key of cookieKeys) {
      const value = searchParams.get(key);
      if (value) {
        cookieData[key] = value;
        searchParams.delete(key);
        shouldRedirect = true;
      }
    }

    if (shouldRedirect) {
      const redirectUrl = new URL(url);
      redirectUrl.search = searchParams.toString();

      const response = NextResponse.redirect(redirectUrl, { status: 307 });

      for (const [key, value] of Object.entries(cookieData)) {
        response.cookies.set(key, value, { path: "/" });
      }

      return response;
    }
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL(PATHS.HOME, request.url));
  }
}