import Categories from './_components/Categories';
import LatestScript from './_components/LatestScripts';
import ScriptSearch from './_components/ScriptSearch';
import clsx from 'clsx';

export default function Home() {
  return (
    <main className={clsx('mt-[var(--header-height)]')}>
      <ScriptSearch />
      <div className="flex flex-col gap-[15px] p-3">
        <Categories />
        <LatestScript />
      </div>
    </main>
  );
}
