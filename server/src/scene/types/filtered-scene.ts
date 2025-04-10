import { Scene } from '../entities/scene.entity';

export type FilteredScene = Promise<
  Pick<Scene, 'id' | 'title' | 'audioUrl' | 'speakers' | 'dialogues'>
>;
