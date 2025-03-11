import Link from "next/link";
import Nav from "../Nav";
import { PATHS } from "@/constants/path";
import { Squirrel } from "lucide-react";
import Text from "../Text";
import clsx from "clsx";

export default function Header() {
  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 bg-white shadow-lg",
        "flex justify-between items-center px-2 py-4",
        "h-[var(--header-height)] z-[var(--header-z-index)]"
      )}
    >
      <Link href={PATHS.HOME} className="flex gap-[2px] items-center">
        <Squirrel size={30} className="text-yellow-500" />
        <Text as="h2" typography="headline-lg">
          Renglish
        </Text>
      </Link>
      <div className="flex">
        <Nav />
      </div>
    </header>
  );
}
