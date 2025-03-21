import { Movie } from '@/types/script';
import fs from 'fs';
import path from 'path';

export const getMovieData = async (movie: string) => {
  const decodedMovie = decodeURIComponent(movie);
  const formattedMoviePosition = decodedMovie
    .split(' ')
    .map((word) => word.toLowerCase())
    .join('_');

  try {
    const filePath = path.join(process.cwd(), `src/assets/contents/${formattedMoviePosition}.json`);
    const jsonData = await fs.promises.readFile(filePath, 'utf-8');
    const movies = JSON.parse(jsonData) as Movie;

    return movies;
  } catch (error) {
    console.error('Error reading the movie data file:', error);
    throw new Error('Unable to load movie data');
  }
};

export const getMovieList = async () => {
  try {
    const directoryPath = path.join(process.cwd(), 'src/assets/contents');

    const files = await fs.promises.readdir(directoryPath);

    const jsonFiles = files.filter((file) => file.endsWith('.json'));

    const movieListPromises = jsonFiles.map(async (file) => {
      const filePath = path.join(directoryPath, file);
      const jsonData = await fs.promises.readFile(filePath, 'utf-8');
      const movieData = JSON.parse(jsonData) as Movie;
      return movieData;
    });

    const movieList = await Promise.all(movieListPromises);

    return movieList;
  } catch (error) {
    console.error('Error reading movie list:', error);
    throw new Error('Unable to load movie list');
  }
};
