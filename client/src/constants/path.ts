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
    STUDIES: {
      ADD: '/admin/studies/add',
      LIST: '/admin/studies',
      DETAIL: (study: string) => `/admin/studies/${study}`,
    },
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
        EXPRESSION: (movie: string, script: string) =>
          `/movies/${movie}/${script}/practice/expression`,
      },
    },
  },
  STUDIES: { LIST: '/studies' },
  NOTICES: {
    LIST: '/notices',
    INSTALL: '/notices/install',
    ASSIGNMENT: '/notices/assignment',
    INTRODUCE: '/introduce',
    MEMBER: '/notices/member',
  },
  MY: {
    PROFILE: '/my/profile',
    STUDIES: '/my/studies',
    WRITINGS: '/my/writings',
    INQUIRIES: '/my/inquiries',
  },
};
