import { Dialogue } from './dialogue';
import { Speaker } from './speaker';

export type Scene = {
  id: string;
  title: string;
  createdAt: Date;
  dialogues: Dialogue[];
  speakers: Speaker[];
};
