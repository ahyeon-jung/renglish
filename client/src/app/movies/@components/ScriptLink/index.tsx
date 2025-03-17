"use client";

import Link from "next/link";
import { Movie } from "@/types/script";
import { PATHS } from "@/constants/path";
import Text from "@/components/Text";
import clsx from "clsx";

type ScriptLink = { id: number } & Pick<Movie, "title">;

export default function ScriptLink({ title, id }: ScriptLink) {
  const sceneId = id > 9 ? id + 1 : "0" + (id + 1);

  return (
    <Link
      href={PATHS.MOVIE.SCENE.SCRIPT.DUAL(title, id.toString())}
      className={clsx(
        "text-orange-600 hover:text-orange-800 transition-colors"
      )}
    >
      <Text as="span" typography="subHead-xl">
        {sceneId}
      </Text>
    </Link>
  );
}
