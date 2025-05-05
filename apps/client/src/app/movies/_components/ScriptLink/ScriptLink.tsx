"use client";

import Link from "next/link";
import { PATHS } from "@/constants/path";
import { Scene } from "@/types/scene";
import Text from "@/components/Text";
import clsx from "clsx";

type ScriptLink = { index: number; movieTitle: string } & Pick<Scene, "id" | "title">;

export default function ScriptLink({ index, title, id, movieTitle }: ScriptLink) {
  const sceneId = index > 9 ? index + 1 : "0" + (index + 1);

  return (
    <Link
      href={PATHS.MOVIE.SCENE.SCRIPT.ENGLISH(movieTitle, id.toString())}
      className={clsx(
        "flex justify-between items-center p-1 rounded-sm",
        "text-orange-500 hover:text-orange-700 transition-colors",
      )}
    >
      <Text className="truncate w-[170px]" as="h4" typography="body-md">
        {title}
      </Text>
      <Text as="div" typography="subHead-md">
        Scene{" "}
        <Text as="span" typography="subHead-xl">
          {sceneId}
        </Text>
      </Text>
    </Link>
  );
}
