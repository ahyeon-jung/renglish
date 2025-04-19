export const PATHS = {
  HOME: '/',
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    RESET_PASSWORD: '/auth/reset-password',
  },
  MOVIE: {
    LIST: '/movies',
    DETAIL: (movie: string) => `/movies/${movie}`,
    SCENE: {
      SCRIPT: {
        ENGLISH: (movie: string, script: string) => `/movies/${movie}/${script}/script/en`,
        KOREAN: (movie: string, script: string) => `/movies/${movie}/${script}/script/ko`,
        DUAL: (movie: string, script: string) => `/movies/${movie}/${script}/script/en-ko`,
        DOWNLOAD: (movie: string, script: string) => `/movies/${movie}/${script}/script/download`,
      },
      PRACTICE: {
        FILL: (movie: string, script: string) => `/movies/${movie}/${script}/practice/fill`,
        SPEAKING: (movie: string, script: string) => `/movies/${movie}/${script}/practice/speaking`,
        WRITING: (movie: string, script: string) => `/movies/${movie}/${script}/practice/writing`,
        EXPRESSION: (movie: string, script: string) =>
          `/movies/${movie}/${script}/practice/expression`,
      },
    },
  },
  WEEKLY_EXPRESSIONS: '/expressions',
  STUDIES: { LIST: '/studies' },
  NOTICES: {
    LIST: '/notices',
    INSTALL: '/notices/install',
    ASSIGNMENT: '/notices/assignment',
    INTRODUCE: '/introduce',
    MEMBER: '/notices/member',
  },
  MY: {
    HOME: '/my',
    PROFILE: '/my/profile',
    STUDIES: '/my/studies',
    WRITINGS: '/my/writings',
    INQUIRIES: '/my/inquiries',
  },
};
