import { NextRequest, NextResponse } from 'next/server';

import { PATHS } from '@/constants/path';

export async function withAuthRouteMiddleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  if (!token) {
    return NextResponse.redirect(new URL(PATHS.HOME, request.url));
  }

  return NextResponse.next();
}

export async function withoutAuthRouteMiddleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  if (token) {
    return NextResponse.redirect(new URL(PATHS.HOME, request.url));
  }

  return NextResponse.next();
}

export async function logoutRouteMiddleware() {
  const response = NextResponse.next();
  response.cookies.delete('token');

  return response;
}
