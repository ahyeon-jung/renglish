import { formatDate, formatTitle } from "@/utils/format";

import { Calendar } from "lucide-react";
import Link from "next/link";
import { Movie } from "@/types/script";
import { PATHS } from "@/constants/path";
import ScriptLink from "../ScriptLink";
import Text from "@/components/Text";
import clsx from "clsx";

type ScriptListItem = Movie;

export default function ScriptListItem({ title, scenes }: ScriptListItem) {
  const today = new Date();

  return (
    <li
      className={clsx(
        "flex justify-between",
        "border border-gray-300 p-6 rounded-lg shadow-lg hover:shadow-xl",
        "transition-shadow duration-300"
      )}
    >
      <div className="flex flex-col mb-4">
        <Link href={PATHS.MOVIE_DETAIL(title)}>
          <Text>{formatTitle(title)}</Text>
        </Link>
        <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
          <Calendar size={16} />
          <Text typography="subtitle1">{formatDate(today)}</Text>
        </div>
      </div>
      <div className="flex gap-4 mt-4">
        {scenes.map((_, index) => (
          <ScriptLink key={index} title={title} id={index} />
        ))}
      </div>
    </li>
  );
}
