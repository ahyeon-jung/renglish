import DialogListContainer from '../../@components/DialogListContainer';
import DialogListItem from '../../@components/DialogListItem';
import SceneHeader from '../../@components/SceneHeader';
import { getMovieData } from '@/app/@actions/getContent';
import { parseText } from '@/utils/content';

export default async function MovieScenePracticeFill({
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

          return (
            <DialogListItem
              key={index}
              speaker={dialogue.speaker}
              isLeft={isDifferentSpeaker}
              isBackground
            >
              {parseText(dialogue.en, 'text-white border-black border-b')}
              {parseText(dialogue.ko)}
            </DialogListItem>
          );
        })}
      </DialogListContainer>
    </main>
  );
}
