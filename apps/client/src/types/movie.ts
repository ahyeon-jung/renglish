import { Scene } from "./scene";

export type Movie = {
  id: string;
  title: string;
  createdAt: Date;
  description: string;
  imageUrl: string;
  scenes: Scene[];
};
