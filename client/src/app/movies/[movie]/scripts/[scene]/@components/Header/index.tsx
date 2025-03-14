"use client";

import { useRouter, useSearchParams } from "next/navigation";

import Indicator from "@/components/Indicator";
import { LANGUAGE_MODE } from "@/constants/language";
import SubHeaderContainer from "@/components/SubheaderContainer";
import { formatTitle } from "@/utils/format";

type Header = { title: string };

export default function Header({ title }: Header) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");

  const changeModeToLanguage = (value: string) => {
    router.replace(`?mode=${value}`);
  };

  return (
    <SubHeaderContainer title={formatTitle(title)}>
      <Indicator>
        {LANGUAGE_MODE.map(({ label, value }) => (
          <Indicator.Item
            key={value}
            label={label}
            isDefault={!mode && value === LANGUAGE_MODE[0].value}
            isActive={mode === value}
            onClick={() => changeModeToLanguage(value)}
          />
        ))}
      </Indicator>
    </SubHeaderContainer>
  );
}
