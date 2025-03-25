import { Speaker } from './speaker';

export type Dialogue = {
  speaker: Speaker;
  order: number;
  korean_script: string;
  english_script: string;
};
