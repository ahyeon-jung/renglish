import Link from "next/link";
import Text from "../Text";
import clsx from "clsx";

type NavItemType = { path: string; label: string };

export default function NavItem({ path, label }: NavItemType) {
  return (
    <Link
      href={path}
      className={clsx(
        "border-b border-b-white hover:border-b-black",
        "transition-all duration-300 ease-in-out"
      )}
    >
      <Text as="label" typography="subHead-lg">
        {label}
      </Text>
    </Link>
  );
}
