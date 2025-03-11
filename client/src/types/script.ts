export type Movie = {
  scenes: MovieScene[];
} & MovieInfo;

export type MovieInfo = {
  title: string;
  description: string;
};

export type MovieScene = {
  dialogues: MovieSceneDialogue[];
};

export type MovieSceneDialogue = {
  speaker: string;
  text: string;
};
