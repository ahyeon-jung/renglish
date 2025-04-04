import Text from '@/components/Text';
import UpdateDialogueModal from './UpdateDialogueModal';
import getScene from '@/app/_actions/scenes/getScene';
import { parseText } from '@/utils/content';

export default async function AdminMovieSceneEnglishKoreanScript({
  params,
}: {
  params: Promise<{ scriptId: string }>;
}) {
  const slug = await params;

  const { data: scene } = await getScene(slug.scriptId);

  return (
    <main className="mt-[var(--header-height)] p-3">
      <div className="flex flex-col gap-3">
        {scene.dialogues.map((dialogue, index) => {
          return (
            <div key={index} className="relative">
              <div>
                <Text>{parseText(dialogue.english_script, 'font-bold')}</Text>
                <Text>{parseText(dialogue.korean_script)}</Text>
              </div>
              <UpdateDialogueModal {...dialogue} />
            </div>
          );
        })}
      </div>
    </main>
  );
}
