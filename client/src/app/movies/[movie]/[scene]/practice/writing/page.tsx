import SceneHeader from '../../_components/SceneHeader';
import WritingDialogues from './_components/WritingDialogues';
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
      <WritingDialogues dialogues={scene.dialogues} />
    </main>
  );
}
