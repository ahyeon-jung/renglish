"use client";

import { useParams, usePathname, useRouter } from "next/navigation";

import { PATHS } from "@/constants/path";
import clsx from "clsx";

export default function SpeakingButton() {
  const router = useRouter();
  const params = useParams<{ movie: string; scene: string }>();
  const pathname = usePathname();

  const isSpeakingPage =
    pathname === PATHS.MOVIE_SPEAKING(params.movie, params.scene);

  const goToScript = () => {
    router.push(PATHS.MOVIE_SCRIPT(params.movie, params.scene));
  };

  const goToSpeaking = () => {
    router.push(PATHS.MOVIE_SPEAKING(params.movie, params.scene));
  };

  return (
    <button
      className={clsx("py-1 px-3 rounded-lg", "hover:bg-yellow-200")}
      onClick={isSpeakingPage ? goToScript : goToSpeaking}
    >
      {isSpeakingPage ? "End" : "Speaking mode"}
    </button>
  );
}
