export const SCRIPT_MODE_SEARCH = "mode";

export const SCRIPT_MODE = {
  BLANK: "blank",
  ENGLISH: "english",
  KOREAN: "korean",
  DUAL: "dual",
} as const;

export type SCRIPT_MODE = (typeof SCRIPT_MODE)[keyof typeof SCRIPT_MODE];

export const SCRIPT_OPTIONS = [
  { label: "빈칸", value: SCRIPT_MODE.BLANK },
  { label: "영어", value: SCRIPT_MODE.ENGLISH },
  { label: "한글", value: SCRIPT_MODE.KOREAN },
  { label: "한영", value: SCRIPT_MODE.DUAL },
];
