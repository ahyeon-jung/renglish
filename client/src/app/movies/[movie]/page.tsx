import MovieInfo from './_components/MovieInfo';
import clsx from 'clsx';
import getMovie from '@/app/_actions/movies/getMovie';

export default async function MovieDetail({ params }: { params: Promise<{ movie: string }> }) {
  const slug = await params;

  const { data: movie } = await getMovie(slug.movie);

  return (
    <main className={clsx('mt-[var(--header-height)] p-3', 'flex flex-col gap-[30px]')}>
      <MovieInfo {...movie} />
      <div className="flex flex-col gap-[10px]">
        {movie.scenes.map((scene) => (
          <div key={scene.id}>{/* <LineItem text={dialogues[0].en} /> */}</div>
        ))}
      </div>
    </main>
  );
}
