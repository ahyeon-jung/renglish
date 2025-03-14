"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { ChevronLeft } from "lucide-react";
import Indicator from "@/components/Indicator";
import { LANGUAGE_MODE } from "@/constants/language";
import Text from "@/components/Text";
import clsx from "clsx";
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
    <header
      style={{
        top: "calc(var(--header-height) - 5px)",
        zIndex: `calc(var(--header-z-index) + 1)`,
      }}
      className={clsx(
        "fixed inset-x-0",
        "h-[50px] bg-white shadow-sm",
        "flex items-center justify-between py-[10px]"
      )}
    >
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
