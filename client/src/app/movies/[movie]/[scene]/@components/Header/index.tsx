"use client";

import { LANGUAGE_MODE, LANGUAGE_OPTIONS } from "@/constants/language";
import { restoreScrollPosition, saveScrollPosition } from "@/utils/scroll";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import Indicator from "@/components/Indicator";
import { MessagesSquare } from "lucide-react";
import { PATHS } from "@/constants/path";
import SubHeaderContainer from "@/components/SubheaderContainer";
import clsx from "clsx";
import { formatTitle } from "@/utils/format";
import { useEffect } from "react";

type Header = { title: string };

export default function Header({ title }: Header) {
  const router = useRouter();
  const params = useParams<{ movie: string; scene: string }>();
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");

  const changeModeToLanguage = (value: string) => {
    saveScrollPosition();
    router.replace(`?mode=${value}`);
  };

  const handleClickSpeakingButton = () => {
    if (pathname === PATHS.MOVIE_SPEAKING(params.movie, params.scene)) {
      router.push(PATHS.MOVIE_SCRIPT(params.movie, params.scene));
      return;
    }
    router.push(PATHS.MOVIE_SPEAKING(params.movie, params.scene));
  };

  useEffect(() => {
    const restoreScrollWithDelay = () => {
      window.requestAnimationFrame(() => {
        restoreScrollPosition();
      });
    };
    restoreScrollWithDelay();
  }, [mode]);

  return (
    <SubHeaderContainer title={formatTitle(title)}>
      <button
        className={clsx(
          "py-1 px-3 rounded-lg",
          pathname === PATHS.MOVIE_SPEAKING(params.movie, params.scene)
            ? "bg-yellow-200"
            : ""
        )}
        onClick={handleClickSpeakingButton}
      >
        <MessagesSquare />
      </button>
      <Indicator>
        {LANGUAGE_OPTIONS.map(({ label, value }) => (
          <Indicator.Item
            key={value}
            label={label}
            isDefault={!mode && value === LANGUAGE_MODE.ENGLISH}
            isActive={mode === value}
            onClick={() => changeModeToLanguage(value)}
          />
        ))}
      </Indicator>
    </SubHeaderContainer>
  );
}
