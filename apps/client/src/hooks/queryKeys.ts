export const QUERY_KEYS = {
  SCENE: {
    LIST: 'scenes',
    DETAIL: (sceneId: string, token: string) => ['scene', sceneId, token],
  },
  EXPRESSION: {
    LIST: (sceneId: string, token: string) => ['expressions', sceneId, token],
  },
  TOKEN: {
    CHECK: (token: string) => ['check-token', token],
  },
  STUDY: {
    LIST: 'studies',
    RECRUITING: 'recruiting-studies',
  },
  MOVIE: {
    LATEST: 'latest-movie',
  },
} as const;
