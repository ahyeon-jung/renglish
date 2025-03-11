import Text from "@/components/Text";
import { formatTitle } from "@/utils/format";

export default async function MovieDetail({
  params,
}: {
  params: Promise<{ movie: string }>;
}) {
  const { movie } = await params;

  return (
    <main className="mt-[var(--header-height)] p-3">
      <Text>{formatTitle(movie)}</Text>
    </main>
  );
}
