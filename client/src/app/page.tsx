import LatestScript from './_components/LatestScripts';
import RecruitingStudies from './_components/RecruitingStudies';
import ScriptSearch from './_components/ScriptSearch';
import clsx from 'clsx';

export default function Home() {
  return (
    <>
      <main className={clsx('mt-[var(--header-height)]')}>
        <ScriptSearch />
        <div className="flex flex-col gap-[5px] px-3 pt-1">
          <LatestScript />
          <RecruitingStudies />
        </div>
      </main>
    </>
  );
}
