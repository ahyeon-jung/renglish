import { APIResponse } from '@/types/api';
import { ENV } from '@/constants/env';
import { FetchError } from '@/utils/error';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  AuthApi,
  Configuration,
  DialoguesApi,
  EmailVerificationApi,
  ExpressionApi,
  MoviesApi,
  MyApi,
  ScenesApi,
  SpeakersApi,
  StudyApi,
  UsersApi,
  WritingsApi,
} from '@/services';
import { fetchWithToken } from './fetchWithToken';

export async function fetchAPI<T = void>(endpoint: string, options?: RequestInit, isRetry = false) {
  const baseURL = ENV.API_BASE_URL;

  const res = await fetch(`${baseURL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (res.status === 401 && !isRetry) {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get(ENV.COOKIE_REFRESH_TOKEN_KEY)?.value;

    const refreshRes = await fetch(`${baseURL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    if (refreshRes.status === 401) {
      redirect(`/api/auth/logout`);
    }

    if (!refreshRes.ok) {
      throw new Error('Refresh token expired or invalid');
    }

    const {
      data: { accessToken },
    } = await refreshRes.json();

    redirect(`/api/cookies/refresh/${accessToken}`);

    return fetchAPI<T>(
      endpoint,
      {
        ...options,
        headers: {
          ...options?.headers,
          Authorization: `Bearer ${accessToken}`,
        },
      },
      true,
    );
  }

  if (!res.ok) {
    const errorMessage = `Request failed with status ${res.status}: ${res.statusText}`;
    throw new FetchError(errorMessage, res);
  }

  return res.json() as Promise<APIResponse<T>>;
}

const config = new Configuration({
  basePath: ENV.API_BASE_URL,
  fetchApi: fetchWithToken,
});

export const myApi = new MyApi(config);
export const movieApi = new MoviesApi(config);
export const authApi = new AuthApi(config);
export const studyApi = new StudyApi(config);
export const sceneApi = new ScenesApi(config);
export const speakerApi = new SpeakersApi(config);
export const expressionApi = new ExpressionApi(config);
export const emailVerificationApi = new EmailVerificationApi(config);
export const dialogueApi = new DialoguesApi(config);
export const writingApi = new WritingsApi(config);
export const userApi = new UsersApi(config);
