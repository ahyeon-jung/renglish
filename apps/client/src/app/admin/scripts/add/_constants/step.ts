export const SCRIPT_ADD_STEP = {
  MOVIE: 'movie',
  SCENE: 'scene',
  SPEAKERS: 'speakers',
  DIALOGUES: 'dialogues',
  EXPRESSIONS: 'expressions',
  SUBMIT_CONFIRM: 'submit-confirm',
} as const;

export type ScriptAddStepType = (typeof SCRIPT_ADD_STEP)[keyof typeof SCRIPT_ADD_STEP];
