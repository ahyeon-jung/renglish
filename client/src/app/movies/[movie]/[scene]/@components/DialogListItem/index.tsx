import { CircleUserRound } from "lucide-react";
import { MovieSceneDialogue } from "@/types/script";
import clsx from "clsx";

type DialogListItem = {
  text: string;
  isLeft?: boolean;
  isBackground?: boolean;
  style?: React.CSSProperties;
} & Pick<MovieSceneDialogue, "speaker">;

export default function DialogListItem({
  speaker,
  text,
  isLeft = false,
  isBackground = false,
  style,
}: DialogListItem) {
  if (speaker == "etc") {
    return <li className="text-center italic">{text}</li>;
  }

  return (
    <li
      style={style}
      className={clsx(
        "flex items-start gap-4 p-3 rounded-lg",
        isLeft ? " flex-row-reverse" : "",
        isBackground ? "bg-gray-100 dark:bg-gray-800" : ""
      )}
    >
      <div
        className={clsx(
          "flex flex-col items-center",
          "text-gray-600 dark:text-gray-300"
        )}
      >
        <CircleUserRound className="w-8 h-8" />
        <span className="text-sm font-medium">{speaker.split(" ")[0]}</span>
      </div>
      <div
        className={clsx(
          isBackground
            ? "bg-white dark:bg-gray-700"
            : "bg-gray-100 dark:bg-gray-800",
          "text-gray-900 dark:text-gray-100",
          "p-3 rounded-lg"
        )}
      >
        {text}
      </div>
    </li>
  );
}
