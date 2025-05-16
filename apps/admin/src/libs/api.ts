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
} from "@renglish/services";
import ENV from "../constants/env";

const customFetch = (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("token");

  const headers = new Headers(options.headers);
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  headers.set("Content-Type", "application/json");

  const updatedOptions = { ...options, headers };

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
