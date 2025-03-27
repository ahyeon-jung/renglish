import { NextRequest, NextResponse } from 'next/server';
import {
  logoutRouteMiddleware,
  withAdminRouteMiddleware,
  withoutAuthRouteMiddleware,
} from './middlewares/auth';

import { PATHS } from './constants/path';

type MiddlewareFunction = (request: NextRequest) => Promise<Response> | Response;

const pageRoutesMap: Record<string, MiddlewareFunction> = {
  // Routes where no token is required
  [PATHS.AUTH.LOGIN]: withoutAuthRouteMiddleware,
  [PATHS.AUTH.REGISTER]: withoutAuthRouteMiddleware,
  [PATHS.AUTH.REGISTER]: withoutAuthRouteMiddleware,

  // Routes that require a token (authenticated user)
  [PATHS.PROFILE]: withAdminRouteMiddleware,
  [PATHS.AUTH.LOGOUT]: logoutRouteMiddleware,

  // Admin routes that require admin token
  admin: withAdminRouteMiddleware,
};

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith(PATHS.ADMIN.HOME)) {
    return pageRoutesMap['admin'](request);
  }

  if (pageRoutesMap[pathname]) {
    return pageRoutesMap[pathname](request);
  }

  return NextResponse.next();
}
