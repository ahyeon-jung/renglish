import ScriptListItem from './_components/ScriptListItem';
import clsx from 'clsx';
import getScenes from '@/app/@actions/scenes/getScenes';

export default async function Scripts() {
  const { data: scenes } = await getScenes();

  return (
    <main className={clsx('mt-[var(--header-height)] p-3')}>
      <ul className="flex flex-col gap-[15px]">
        {scenes.map((scene, index) => (
          <ScriptListItem key={index} {...scene} />
        ))}
      </ul>
    </main>
  );
}
