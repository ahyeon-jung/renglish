import checkTokenAction from '@/app/_actions/check/checkToken';
import SceneHeader from '../../_components/SceneHeader';
import WritingDialogues from './_components/WritingDialogues';
import getScene from '@/app/_actions/scenes/getScene';
import { GoToLogin } from '@/components/Fallback';

export default async function MovieScenePracticeWriting({
  params,
}: {
  params: Promise<{ movie: string; scene: string }>;
}) {
  const slug = await params;

  const isTokenValid = await checkTokenAction();
  if (!isTokenValid) return <GoToLogin />;

  const { data: scene } = await getScene(slug.scene);

  return (
    <main className="mt-[var(--header-height)] p-3">
      <SceneHeader title={slug.movie} movieId={slug.movie} sceneId={slug.scene} />
      <WritingDialogues dialogues={scene.dialogues} />
    </main>
  );
}
