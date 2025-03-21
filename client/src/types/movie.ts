import { Scene } from './scene';

export type Movie = {
  id: string;
  title: string;
  createdAt: Date;
  studiedAt: Date;
  description: string;
  imageUrl: string;
  scenes: Scene[];
};
