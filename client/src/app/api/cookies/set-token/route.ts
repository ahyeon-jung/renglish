import { NextResponse } from 'next/server';
import { ENV } from '@/constants/env';

export async function POST(req: Request) {
  const { accessToken, refreshToken, rememberMe } = await req.json();

  const response = NextResponse.json({ status: 200, success: true, message: 'Tokens set successfully', data: null });

  response.cookies.set(ENV.COOKIE_ACCESS_TOKEN_KEY, accessToken, {
    httpOnly: true,
    secure: ENV.IS_PRODUCTION,
    path: '/',
  });

  response.cookies.set(ENV.COOKIE_REFRESH_TOKEN_KEY, refreshToken, {
    httpOnly: true,
    secure: ENV.IS_PRODUCTION,
    path: '/',
    ...(rememberMe && { maxAge: 60 * 60 * 24 * 7 }),
  });

  return response;
}
