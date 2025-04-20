import { ENV } from '@/constants/env';
import Image from 'next/image';
import Link from 'next/link';
import Nav from '../Nav';
import { PATHS } from '@/constants/path';
import Text from '../Text';
import clsx from 'clsx';
import { cookies } from 'next/headers';
import logo from '@/assets/logo.png';

export default async function Header() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ENV.COOKIE_ACCESS_TOKEN_KEY)?.value;

  return (
    <header
      className={clsx(
        'fixed inset-x-0 top-0 bg-white shadow-sm',
        'flex justify-between items-center px-3 py-4',
        'h-[var(--header-height)] z-[var(--header-z-index)]',
      )}
    >
      <Link href={PATHS.HOME} className="flex gap-[4px] items-center">
        <Image src={logo} alt="Renglish logo image" width={25} height={25} />
        <Text as="h2" className='text-gray-800' typography="headline-md">
          english
        </Text>
      </Link>
      <div className="flex">
        <Nav hasToken={!!token} />
      </div>
    </header>
  );
}
