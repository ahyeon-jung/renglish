import clsx from 'clsx';
import LatestScript from './_components/LatestScripts';
import RecruitingStudies from './_components/RecruitingStudies';
import ScriptSearch from './_components/ScriptSearch';
import RandomExpression from './_components/Expression/Expression';

export default function HomePage() {
  return (
    <main className={clsx('mt-[var(--header-height)] pb-4')}>
      <ScriptSearch />
      <div className="flex flex-col gap-[5px] px-3 pt-1">
        <div className="order-1 md:order-2">
          <LatestScript />
        </div>
        <div className="order-2 md:order-1">
          <RecruitingStudies />
        </div>
        <div className="order-3 md:order-3 hidden md:block">
          <RandomExpression />
        </div>
      </div>
    </main>
  );
}
