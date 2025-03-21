import { Dialogue } from './dialogue';

export type Scene = {
  id: string;
  title: string;
  createdAt: Date;
  dialogues: Dialogue[];
  speakers: string[];
};
