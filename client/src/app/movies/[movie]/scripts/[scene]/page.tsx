import DialogList from "./@components/DialogList";
import Header from "./@components/Header";
import { MOVIES } from "@/assets/contents/movie";

export default async function MovieScriptScene({
  params,
}: {
  params: Promise<{ movie: string; scene: string }>;
}) {
  const scripts = MOVIES[0].scenes[0].dialogues;

  const { movie } = await params;

  return (
    <main className="mt-[var(--header-height)] p-3">
      <Header title={movie} />
      <DialogList dialogues={scripts} />
    </main>
  );
}
