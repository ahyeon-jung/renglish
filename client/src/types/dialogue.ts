import { Speaker } from './speaker';

export type Dialogue = {
  id: string;
  speaker: Speaker;
  order: number;
  korean_script: string;
  english_script: string;
};

export type WritingDialogueType = Dialogue & { writing_script?: string };
