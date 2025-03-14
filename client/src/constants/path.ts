export const PATHS = {
  HOME: "/",
  MOVIE_LIST: "/movies",
  MOVIE_DETAIL: (movie: string) => `/movies/${movie}`,
  MOVIE_SCRIPT: (movie: string, script: string) =>
    `/movies/${movie}/${script}/scripts`,
  MOVIE_SPEAKING: (movie: string, script: string) =>
    `/movies/${movie}/${script}/speaking`,
};
