import Text from '@/components/Text/index';
import UpdateDialogueModal from './UpdateDialogueModal';
import UpdateSceneModal from './UpdateSceneModal';
import getScene from '@/app/actions/scenes/getScene';
import { parseText } from '@/utils/content';

export default async function AdminMovieSceneEnglishKoreanScript({
  params,
}: {
  params: Promise<{ scriptId: string }>;
}) {
  const slug = await params;

  const { data: scene } = await getScene(slug.scriptId);

  const speakerCount = scene.dialogues.reduce(
    (acc, dialogue) => {
      const type = dialogue.speaker.speakerType;
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );
  return (
    <main className="mt-[var(--header-height)] p-3 flex flex-col gap-3">
      <UpdateSceneModal {...scene} />
      <ul className="flex gap-6">
        {Object.entries(speakerCount).map(([type, count]) => (
          <li key={type} className="text-xl">
            {type.toUpperCase()}: {count}개
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-3">
        {scene.dialogues.map((dialogue, index) => {
          return (
            <div key={index} className="relative flex items-center gap-4">
              <div>{dialogue.speaker.speakerType.toUpperCase()}</div>
              <div>
                <Text>{parseText(dialogue.englishScript, 'font-bold')}</Text>
                <Text>{parseText(dialogue.koreanScript)}</Text>
              </div>
              <UpdateDialogueModal {...dialogue} />
            </div>
          );
        })}
      </div>
    </main>
  );
}
