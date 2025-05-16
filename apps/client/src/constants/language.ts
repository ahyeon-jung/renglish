export const LANGUAGE_MODE = { ENGLISH: "english", KOREAN: "korean" } as const;

export type LanguageMode = (typeof LANGUAGE_MODE)[keyof typeof LANGUAGE_MODE];

export const LANGUAGE_OPTIONS = [
  { label: "English", value: LANGUAGE_MODE.ENGLISH },
  { label: "Korean", value: LANGUAGE_MODE.KOREAN },
];
