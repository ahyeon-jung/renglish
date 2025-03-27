import DialogListContainer from '../../_components/DialogListContainer';
import Dialogue from './Dialogue';
import SceneHeader from '../../_components/SceneHeader';
import getScene from '@/app/_actions/scenes/getScene';

export default async function MovieScenePracticeWriting({
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
          return <Dialogue key={index} {...dialogue} />;
        })}
      </DialogListContainer>
    </main>
  );
}
