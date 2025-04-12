'use server';

import { ENV } from '@/constants/env';
import { cookies } from 'next/headers';
import { AuthApi } from '@/services';
import { Configuration } from '@/services';

export default async function adminAction() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ENV.COOKIE_ACCESS_TOKEN_KEY)?.value;

    const api = new AuthApi(
      new Configuration({
        basePath: ENV.API_BASE_URL,
        accessToken: token,
      }),
    );

    const isAdmin = await api.authControllerCheckIsAdmin();

    return isAdmin;
  } catch {
    return false;
  }
}
