import { CircleUserRound } from "lucide-react";
import { MovieSceneDialogue } from "@/types/script";
import clsx from "clsx";

type DialogListItem = MovieSceneDialogue;

export default function DialogListItem({ speaker, text }: DialogListItem) {
  return (
    <li
      className={clsx(
        "flex items-start gap-4 p-3 rounded-lg",
        "bg-gray-100 dark:bg-gray-800"
      )}
    >
      <div
        className={clsx(
          "flex flex-col items-center",
          "text-gray-600 dark:text-gray-300"
        )}
      >
        <CircleUserRound className="w-8 h-8" />
        <span className="text-sm font-medium">{speaker}</span>
      </div>
      <div
        className={clsx(
          "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100",
          "p-3 rounded-lg"
        )}
      >
        {text}
      </div>
    </li>
  );
}
