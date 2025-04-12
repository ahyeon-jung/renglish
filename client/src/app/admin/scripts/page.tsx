import SceneSearch from './_components/SceneSearch';
import ScriptListItem from './_components/ScriptListItem';
import clsx from 'clsx';
import getScenes from '@/app/_actions/scenes/getScenes';

export default async function ScriptsPage({
  searchParams,
}: {
  searchParams: Promise<{ keyword?: string }>;
}) {
  const search = await searchParams;
  const {
    data: { data: scenes },
  } = await getScenes({ keyword: search.keyword });

  return (
    <main className={clsx('mt-[var(--header-height)] p-3', 'flex flex-col gap-4')}>
      <SceneSearch currentKeyword={search.keyword} />
      <ul className="flex flex-col gap-[15px]">
        {scenes.length === 0 && <div>No Data</div>}
        {scenes.map((scene, index) => (
          <ScriptListItem key={index} {...scene} />
        ))}
      </ul>
    </main>
  );
}
