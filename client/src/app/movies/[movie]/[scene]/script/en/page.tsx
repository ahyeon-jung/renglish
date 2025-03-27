import DialogListContainer from '../../_components/DialogListContainer';
import DialogListItem from '../../_components/DialogListItem';
import SceneHeader from '../../_components/SceneHeader';
import getScene from '@/app/_actions/scenes/getScene';
import { parseText } from '@/utils/content';

export default async function MovieSceneEnglishScript({
  params,
}: {
  params: Promise<{ movie: string; scene: string }>;
}) {
  const slug = await params;

  const { data: scene } = await getScene(slug.scene);

  return (
    <main className="mt-[var(--header-height)] p-3">
      <SceneHeader title={slug.movie} movieId={slug.movie} sceneId={slug.scene} />
      <DialogListContainer>
        {scene.dialogues.map((dialogue, index) => {
          return (
            <DialogListItem key={index} speaker={dialogue.speaker} isBackground>
              {parseText(dialogue.english_script)}
            </DialogListItem>
          );
        })}
      </DialogListContainer>
    </main>
  );
}
