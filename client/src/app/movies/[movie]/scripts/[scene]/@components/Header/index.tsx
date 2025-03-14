"use client";

import { LANGUAGE_MODE, LANGUAGE_OPTIONS } from "@/constants/language";
import { restoreScrollPosition, saveScrollPosition } from "@/utils/scroll";
import { useRouter, useSearchParams } from "next/navigation";

import Indicator from "@/components/Indicator";
import SubHeaderContainer from "@/components/SubheaderContainer";
import { formatTitle } from "@/utils/format";
import { useEffect } from "react";

type Header = { title: string };

export default function Header({ title }: Header) {
  const router = useRouter();

  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");

  const changeModeToLanguage = (value: string) => {
    saveScrollPosition();
    router.replace(`?mode=${value}`);
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
