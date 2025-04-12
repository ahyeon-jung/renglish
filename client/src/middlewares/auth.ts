import { NextRequest, NextResponse } from 'next/server';

import { ENV } from '@/constants/env';
import { PATHS } from '@/constants/path';
import adminAction from '@/app/_actions/auth/admin';

export async function withAuthRouteMiddleware(request: NextRequest) {
  const token = request.cookies.get(ENV.COOKIE_ACCESS_TOKEN_KEY)?.value;
  if (!token) {
    return NextResponse.redirect(new URL(PATHS.HOME, request.url));
  }

  return NextResponse.next();
}

export async function withAdminRouteMiddleware(request: NextRequest) {
  try {
    const isAdmin = await adminAction();

    if (!isAdmin) {
      return NextResponse.redirect(new URL(PATHS.HOME, request.url));
    }
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL(PATHS.HOME, request.url));
  }
}

export async function withoutAuthRouteMiddleware(request: NextRequest) {
  const token = request.cookies.get(ENV.COOKIE_ACCESS_TOKEN_KEY)?.value;
  if (token) {
    return NextResponse.redirect(new URL(PATHS.HOME, request.url));
  }

  return NextResponse.next();
}

export async function logoutRouteMiddleware() {
  const response = NextResponse.next();
  response.cookies.delete(ENV.COOKIE_ACCESS_TOKEN_KEY);
  response.cookies.delete(ENV.COOKIE_REFRESH_TOKEN_KEY);

  return response;
}
