"use client";

import { ChevronLeft } from "lucide-react";
import Text from "@/components/Text";
import { formatTitle } from "@/utils/format";
import { useRouter } from "next/navigation";

type Header = { title: string };

export default function Header({ title }: Header) {
  const router = useRouter();

  const goToBefore = () => {
    router.back();
  };

  return (
    <header className="flex items-center gap-[15px] py-[10px]">
      <ChevronLeft onClick={goToBefore} />
      <Text>{formatTitle(title)}</Text>
    </header>
  );
}
