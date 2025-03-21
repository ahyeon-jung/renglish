import LineItem from './@components/LineItem';
import MovieInfo from './@components/MovieInfo';
import clsx from 'clsx';
import { getMovieData } from '@/app/@actions/getContent';

export default async function MovieDetail({ params }: { params: Promise<{ movie: string }> }) {
  const slug = await params;

  const movie = await getMovieData(slug.movie);

  return (
    <main className={clsx('mt-[var(--header-height)] p-3', 'flex flex-col gap-[30px]')}>
      <MovieInfo {...movie} />
      <div className="flex flex-col gap-[10px]">
        {movie.scenes.map(({ dialogues }, index) => (
          <LineItem key={index} text={dialogues[0].en} />
        ))}
      </div>
    </main>
  );
}
