export type Movie = {
  scenes: MovieScene[];
} & MovieInfo;

export type MovieInfo = {
  title: string;
};

export type MovieScene = {
  id: number;
  dialogues: MovieSceneDialogue[];
};

export type MovieSceneDialogue = {
  speaker: string;
  text: string;
};
