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
} from '@renglish/services';
import ENV from '../constants/env';

const customFetch = (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token'); // 예시로 로컬스토리지에서 토큰 가져오기

  console.log(token)
  // 헤더를 추가
  const headers = new Headers(options.headers);
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  // 필요한 경우 다른 헤더를 추가할 수도 있음
  headers.set('Content-Type', 'application/json');

  // 옵션에 헤더 추가
  const updatedOptions = { ...options, headers };

  // 기본 fetch 호출
  return fetch(url, updatedOptions);
};

const config = new Configuration({
  basePath: ENV.API_BASE_URL,
  fetchApi: customFetch,
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
