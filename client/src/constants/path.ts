export const PATHS = {
  HOME: "/",
  MOVIE_LIST: "/movies",
  MOVIE_DETAIL: (movie: string) => `/movies/${movie}`,
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
  },
  MOVIE: {
    LIST: "/movies",
    DETAIL: (movie: string) => `/movies/${movie}`,
    SCENE: {
      SCRIPT: {
        ENGLISH: (movie: string, script: string) =>
          `/movies/${movie}/${script}/script/en`,
        KOREAN: (movie: string, script: string) =>
          `/movies/${movie}/${script}/script/ko`,
        DUAL: (movie: string, script: string) =>
          `/movies/${movie}/${script}/script/en-ko`,
      },
      PRACTICE: {
        FILL: (movie: string, script: string) =>
          `/movies/${movie}/${script}/practice/fill`,
        SPEAKING: (movie: string, script: string) =>
          `/movies/${movie}/${script}/practice/speaking`,
        WRITING: (movie: string, script: string) =>
          `/movies/${movie}/${script}/practice/writing`,
      },
    },
  },
  MOVIE_SPEAKING: (movie: string, script: string) =>
    `/movies/${movie}/${script}/speaking`,
};
