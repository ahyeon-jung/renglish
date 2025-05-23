import { ENV } from "@/constants/env";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;

  const cookieStore = await cookies();

  cookieStore.set(ENV.COOKIE_REFRESH_TOKEN_KEY, token, {
    httpOnly: true,
    secure: true,
    path: "/",
  });

  const referer = req.headers.get("referer") || "/";
  const url = new URL(referer, req.url);

  return NextResponse.redirect(url);
}
