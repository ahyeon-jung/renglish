import { NextRequest, NextResponse } from 'next/server';
import { logoutRouteMiddleware, withoutAuthRouteMiddleware } from './middlewares/auth';

type MiddlewareFunction = (request: NextRequest) => Promise<Response> | Response;

const pageRoutesMap: Record<string, MiddlewareFunction> = {
  '/auth/login': withoutAuthRouteMiddleware,
  '/auth/logout': logoutRouteMiddleware,
};

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pageRoutesMap[pathname]) {
    return pageRoutesMap[pathname](request);
  }

  return NextResponse.next();
}
