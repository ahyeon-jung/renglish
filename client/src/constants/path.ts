export const PATHS = {
  HOME: '/',
  MOVIE_LIST: '/movies',
  MOVIE_DETAIL: (movie: string) => `/movies/${movie}`,
  INTRODUCE: '/introduce',
  PROFILE: '/profile',
  ADMIN: {
    HOME: '/admin',
    USERS: { LIST: '/admin/users' },
    INQUIRIES: { LIST: '/admin/inquiries' },
    SCRIPTS: { ADD: '/admin/scripts/add', LIST: '/admin/scripts' },
    NOTICES: { ADD: '/admin/notices/add' },
  },
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
  },
  MOVIE: {
    LIST: '/movies',
    DETAIL: (movie: string) => `/movies/${movie}`,
    SCENE: {
      SCRIPT: {
        ENGLISH: (movie: string, script: string) => `/movies/${movie}/${script}/script/en`,
        KOREAN: (movie: string, script: string) => `/movies/${movie}/${script}/script/ko`,
        DUAL: (movie: string, script: string) => `/movies/${movie}/${script}/script/en-ko`,
      },
      PRACTICE: {
        FILL: (movie: string, script: string) => `/movies/${movie}/${script}/practice/fill`,
        SPEAKING: (movie: string, script: string) => `/movies/${movie}/${script}/practice/speaking`,
        WRITING: (movie: string, script: string) => `/movies/${movie}/${script}/practice/writing`,
      },
    },
  },
  NOTICES: { INSTALL: '/notices/install' },
  MOVIE_SPEAKING: (movie: string, script: string) => `/movies/${movie}/${script}/speaking`,
};
