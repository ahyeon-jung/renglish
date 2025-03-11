import Link from "next/link";
import { Movie } from "@/types/script";
import { PATHS } from "@/constants/path";

type ScriptLink = { id: number } & Pick<Movie, "title">;

export default function ScriptLink({ title, id }: ScriptLink) {
  const sceneId = id > 9 ? id + 1 : "0" + (id + 1);

  return (
    <Link
      href={PATHS.MOVIE_SCRIPT(title, id)}
      className="text-orange-600 hover:text-orange-800 font-medium transition-colors"
    >
      {sceneId}
    </Link>
  );
}
