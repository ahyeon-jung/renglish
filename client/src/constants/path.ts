export const PATHS = {
  HOME: '/',
  ADMIN: {
    HOME: '/admin',
    USERS: { LIST: '/admin/users' },
    INQUIRIES: { LIST: '/admin/inquiries' },
    SCRIPTS: {
      ADD: '/admin/scripts/add',
      LIST: '/admin/scripts',
      DETAIL: (scriptId: string) => `/admin/scripts/${scriptId}`,
    },
    NOTICES: { ADD: '/admin/notices/add' },
  },
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    PROFILE: '/profile',
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
  NOTICES: {
    INSTALL: '/notices/install',
    ASSIGNMENT: '/notices/assignment',
    INTRODUCE: '/introduce',
  },
};
