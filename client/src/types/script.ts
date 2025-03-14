export type Movie = {
  scenes: MovieScene[];
} & MovieInfo;

export type MovieInfo = {
  title: string;
  description: string;
};

export type MovieScene = {
  dialogues: MovieSceneDialogue[];
  speakers: string[];
};

export type MovieSceneDialogue = {
  speaker: string;
  en: string;
  ko: string;
};
