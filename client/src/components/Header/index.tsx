import Link from "next/link";
import { PATHS } from "@/constants/path";
import { Squirrel } from "lucide-react";
import Text from "../Text";
import clsx from "clsx";

export default function Header() {
  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 bg-white shadow-lg",
        "flex justify-between items-center px-6 py-4",
        "h-[var(--header-height)]"
      )}
    >
      <Link href={PATHS.HOME} className="flex gap-[2px] items-center">
        <Squirrel size={30} className="text-yellow-500" />
        <Text as="h2" typography="headline-lg">
          Renglish
        </Text>
      </Link>
      <div className="flex items-center gap-4"></div>
    </header>
  );
}
