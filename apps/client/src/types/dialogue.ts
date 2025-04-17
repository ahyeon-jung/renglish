import { Speaker } from './speaker';

export type Dialogue = {
  id: string;
  speaker: Speaker;
  order: number;
  koreanScript: string;
  englishScript: string;
};

export type WritingDialogueType = Dialogue & { writingScript?: string };
