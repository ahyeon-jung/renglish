import { NextRequest, NextResponse } from 'next/server';
import {
  withAdminRouteMiddleware,
  withAuthRouteMiddleware,
  withoutAuthRouteMiddleware,
} from './middlewares/auth';

import { PATHS } from './constants/path';
import refreshTokenMiddleware from './middlewares/refreshToken';

type MiddlewareFunction = (request: NextRequest) => Promise<Response> | Response;

const pageRoutesMap: Record<string, MiddlewareFunction> = {
  // Routes where no token is required
  [PATHS.AUTH.LOGIN]: withoutAuthRouteMiddleware,
  [PATHS.AUTH.REGISTER]: withoutAuthRouteMiddleware,
  [PATHS.AUTH.REGISTER]: withoutAuthRouteMiddleware,

  // Routes that require a token (authenticated user)
  [PATHS.MY.PROFILE]: withAuthRouteMiddleware,
  [PATHS.AUTH.LOGOUT]: withAuthRouteMiddleware,

  // Admin routes that require admin token
  admin: withAdminRouteMiddleware,
};

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (request.nextUrl.pathname.startsWith('/api/cookies/refresh')) {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith('/movies/')) {
    return refreshTokenMiddleware(request, true);
  }

  if (pageRoutesMap[pathname]) {
    return pageRoutesMap[pathname](request);
  }

  return NextResponse.next();
}
