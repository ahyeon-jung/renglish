import { ENV } from '@/constants/env';
import Image from 'next/image';
import Link from 'next/link';
import Nav from '../Nav';
import { PATHS } from '@/constants/path';
import Text from '../Text';
import clsx from 'clsx';
import { cookies } from 'next/headers';
import logo from '@/assets/logo.png';
import adminAction from '@/app/actions/auth/admin';

export default async function Header() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ENV.COOKIE_ACCESS_TOKEN_KEY)?.value;
  const isAdmin = await adminAction();

  return (
    <header
      className={clsx(
        'fixed inset-x-0 top-0 bg-white shadow-sm',
        'flex justify-between items-center px-4 py-4',
        'h-[var(--header-height)] z-[var(--header-z-index)]',
      )}
    >
      <Link href={PATHS.HOME} className="flex gap-[4px] items-center">
        <Image src={logo} alt="Renglish logo image" width={30} height={30} />
        <Text as="h2" typography="headline-lg">
          english
        </Text>
      </Link>
      <div className="flex">
        <Nav hasToken={!!token} isAdmin={isAdmin} />
      </div>
    </header>
  );
}
