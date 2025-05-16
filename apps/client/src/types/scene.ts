import { Dialogue } from "./dialogue";
import { Speaker } from "./speaker";

export type Scene = {
  id: string;
  description: string;
  title: string;
  audioUrl?: string;
  studiedAt: Date;
  createdAt: Date;
  dialogues: Dialogue[];
  speakers: Speaker[];
};
