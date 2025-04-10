import { Movie } from '../entities/movie.entity';

export type SimplifiedScene = {
  id: string;
  title: string;
};

export type MovieWithSimplifiedScenes = Omit<Movie, 'scenes'> & {
  scenes: SimplifiedScene[];
};
