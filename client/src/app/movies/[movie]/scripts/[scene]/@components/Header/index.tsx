"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { ChevronLeft } from "lucide-react";
import Indicator from "@/components/Indicator";
import { LANGUAGE_MODE } from "@/constants/language";
import Text from "@/components/Text";
import { formatTitle } from "@/utils/format";

type Header = { title: string };

export default function Header({ title }: Header) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");

  const goToBefore = () => {
    router.back();
  };

  const changeModeToLanguage = (value: string) => {
    router.push(`?mode=${value}`);
  };

  return (
    <header className="flex items-center justify-between py-[10px]">
      <div className="flex gap-[15px]">
        <ChevronLeft onClick={goToBefore} />
        <Text>{formatTitle(title)}</Text>
      </div>
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
    </header>
  );
}
