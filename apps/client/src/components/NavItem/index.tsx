import Link from 'next/link';
import Text from '../Text';
import clsx from 'clsx';

type NavItemType = { path: string; label: string };

export default function NavItem({ path, label }: NavItemType) {
  return (
    <Link
      href={path}
      className={clsx(
        'transition-all duration-300 ease-in-out',
      )}
    >
      <Text className="cursor-pointer text-gray-700 hover:text-orange-500" as="label" typography="subHead-lg">
        {label}
      </Text>
    </Link>
  );
}
