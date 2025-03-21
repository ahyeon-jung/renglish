import DialogListContainer from '../../@components/DialogListContainer';
import Dialogue from './Dialogue';
import SceneHeader from '../../@components/SceneHeader';
import { getMovieData } from '@/app/@actions/getContent';

export default async function MovieScenePracticeWriting({
  params,
}: {
  params: Promise<{ movie: string; scene: string }>;
}) {
  const slug = await params;

  const movie = await getMovieData(slug.movie);
  const sceneId = Number(slug.scene);

  return (
    <main className="mt-[var(--header-height)] p-3">
      <SceneHeader title={movie.title} movieId={slug.movie} sceneId={slug.scene} />
      <DialogListContainer>
        {movie.scenes[sceneId].dialogues.map((dialogue, index) => {
          const isDifferentSpeaker = movie.scenes[sceneId].speakers
            .filter((_, index) => index % 2 === 1)
            .includes(dialogue.speaker);

          return <Dialogue key={index} isLeft={isDifferentSpeaker} {...dialogue} />;
        })}
      </DialogListContainer>
    </main>
  );
}
