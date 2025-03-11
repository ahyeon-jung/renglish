export const PATHS = {
  HOME: "/",
  MOVIE_LIST: "/movies",
  MOVIE_DETAIL: (movie: string) => `/movies/${movie}`,
  MOVIE_SCRIPT_LIST: (movie: string) => `/movies/${movie}/scripts`,
  MOVIE_SCRIPT: (movie: string, script: number) =>
    `/movies/${movie}/scripts/${script}`,
};
