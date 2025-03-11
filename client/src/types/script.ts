export type Movie = {
  scenes: MovieScene[];
} & MovieInfo;

export type MovieInfo = {
  title: string;
};

export type MovieScene = {
  dialogues: MovieSceneDialogue[];
};

export type MovieSceneDialogue = {
  speaker: string;
  text: string;
};
