import ScriptListItem from './@components/ScriptListItem';
import clsx from 'clsx';
import { getMovieList } from '../@actions/getContent';

export default async function Scripts() {
  const movies = await getMovieList();

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
