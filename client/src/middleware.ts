import { NextRequest, NextResponse } from 'next/server';
import {
  logoutRouteMiddleware,
  withAdminRouteMiddleware,
  withoutAuthRouteMiddleware,
} from './middlewares/auth';

import { PATHS } from './constants/path';
import updateVisitorCount from './app/_actions/statics/updateVisitorCount';

type MiddlewareFunction = (request: NextRequest) => Promise<Response> | Response;

const pageRoutesMap: Record<string, MiddlewareFunction> = {
  // Routes where no token is required
  [PATHS.AUTH.LOGIN]: withoutAuthRouteMiddleware,
  [PATHS.AUTH.REGISTER]: withoutAuthRouteMiddleware,
  [PATHS.AUTH.REGISTER]: withoutAuthRouteMiddleware,

  // Routes that require a token (authenticated user)
  [PATHS.AUTH.PROFILE]: withAdminRouteMiddleware,
  [PATHS.AUTH.LOGOUT]: logoutRouteMiddleware,

  // Admin routes that require admin token
  admin: withAdminRouteMiddleware,
};

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  let visitorId = request.cookies.get('visitorId')?.value;

  if (!visitorId) {
    visitorId = crypto.randomUUID();
    response.cookies.set('visitorId', visitorId, {
      httpOnly: true,
      maxAge: 60 * 30,
    });

    await updateVisitorCount();
  }

  if (pathname.startsWith(PATHS.ADMIN.HOME)) {
    return pageRoutesMap['admin'](request);
  }

  if (pageRoutesMap[pathname]) {
    return pageRoutesMap[pathname](request);
  }

  return NextResponse.next();
}
