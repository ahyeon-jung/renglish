"use client";

import { SCRIPT_MODE_SEARCH, SCRIPT_OPTIONS } from "@/constants/script-mode";
import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function ScriptModeSelector() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get(SCRIPT_MODE_SEARCH);

  const handleOptionClick = (value: string) => {
    router.push(`?mode=${value}`);
  };

  useEffect(() => {
    if (!mode) {
      router.push(`?mode=${SCRIPT_OPTIONS[0].value}`);
    }
  }, []);

  return (
    <div className="fixed top-[var(--header-height)] mt-6 left-6 flex flex-col gap-2">
      {SCRIPT_OPTIONS.map(({ label, value }) => (
        <div
          key={value}
          className={clsx("p-3 px-5 rounded-xl", mode === value ? "bg-orange-100" : "bg-gray-200")}
          onClick={() => handleOptionClick(value)}
        >
          {label}
        </div>
      ))}
    </div>
  );
}
