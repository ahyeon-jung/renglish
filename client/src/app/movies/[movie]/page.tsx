import Text from "@/components/Text";
import { formatTitle } from "@/utils/format";
import { getMovieData } from "@/app/@actions/getContent";

export default async function MovieDetail({
  params,
}: {
  params: Promise<{ movie: string }>;
}) {
  const slug = await params;

  const movie = await getMovieData(slug.movie);

  return (
    <main className="mt-[var(--header-height)] p-3">
      <Text>{formatTitle(movie.title)}</Text>
    </main>
  );
}
