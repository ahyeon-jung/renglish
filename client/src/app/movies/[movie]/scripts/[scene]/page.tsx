import DialogList from "./@components/DialogList";
import Header from "./@components/Header";
import { getMovieData } from "@/app/@actions/getContent";

export default async function MovieScriptScene({
  params,
}: {
  params: Promise<{ movie: string; scene: string }>;
}) {
  const slug = await params;

  const movie = await getMovieData(slug.movie);
  const sceneId = Number(slug.scene);

  return (
    <main className="mt-[var(--header-height)] p-3">
      <Header title={movie.title} />
      <DialogList dialogues={movie.scenes[sceneId].dialogues} />
    </main>
  );
}
