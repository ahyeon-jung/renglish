import ScriptListItem from './@components/ScriptListItem';
import clsx from 'clsx';
import getMovies from '../@actions/movies/getMovies';

export default async function Scripts() {
  const {
    data: { data: movies },
  } = await getMovies({});

  return (
    <main className={clsx('mt-[var(--header-height)] p-3')}>
      <ul className="flex flex-col gap-[15px]">
        {movies.map((movie, index) => (
          <ScriptListItem key={index} {...movie} />
        ))}
      </ul>
    </main>
  );
}
