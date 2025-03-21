export type Movie = {
  scenes: MovieScene[];
} & MovieInfo;

export type MovieInfo = {
  id: string;
  title: string;
  createdAt: Date;
  studiedAt: Date;
  description: string;
  imageUrl: string;
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
