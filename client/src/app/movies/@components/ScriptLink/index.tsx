import Link from "next/link";
import { PATHS } from "@/constants/path";

type ScriptLink = { title: string; id: string };

export default function ScriptLink({ title, id }: ScriptLink) {
  return (
    <Link
      href={PATHS.MOVIE_SCRIPT(title, id)}
      className="text-orange-600 hover:text-orange-800 font-medium transition-colors"
    >
      {id}
    </Link>
  );
}
