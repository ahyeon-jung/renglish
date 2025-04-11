'use client';

import { useEffect, useState } from 'react';

import Dialog from '../Dialog';
import { LayoutGrid } from 'lucide-react';
import NavAdmin from '../NavAdmin';
import NavItem from '../NavItem';
import { PATHS } from '@/constants/path';
import { createPortal } from 'react-dom';
import { usePathname } from 'next/navigation';

type NavProps = { withAuth: boolean };

const DEFAULT_NAV_OPTIONS = [
  { label: 'Home', path: PATHS.HOME },
  { label: 'Introduce', path: PATHS.NOTICES.INTRODUCE },
  { label: 'Notices', path: PATHS.NOTICES.LIST },
  { label: 'Movies', path: PATHS.MOVIE.LIST },
  { label: 'Studies', path: PATHS.STUDIES.LIST },
];

const WITHOUT_AUTH_NAV_OPTIONS = [
  { label: 'Login', path: PATHS.AUTH.LOGIN },
  { label: 'Register', path: PATHS.AUTH.REGISTER },
];

const WITH_AUTH_NAV_OPTIONS = [
  { label: 'Profile', path: PATHS.MY.PROFILE },
  { label: 'Logout', path: PATHS.AUTH.LOGOUT },
];

export default function Nav({ withAuth }: NavProps) {
  const pathname = usePathname();
  const [isOpenNav, setIsOpenNav] = useState(true);
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalRoot(document.body);
  }, []);

  const openNav = () => setIsOpenNav(true);
  const closeNav = () => setIsOpenNav(false);

  useEffect(() => {
    closeNav();
  }, [pathname, withAuth]);

  return (
    <>
      <LayoutGrid onClick={openNav} className="cursor-pointer" />
      {isOpenNav &&
        portalRoot &&
        createPortal(
          <Dialog isOpen={isOpenNav} onClose={closeNav}>
            <nav className="flex flex-col gap-2">
              {DEFAULT_NAV_OPTIONS.map(({ label, path }) => (
                <NavItem key={path} path={path} label={label} />
              ))}
              <div className='bg-gray-400 h-[0.5px] w-full' />
              {(withAuth ? WITH_AUTH_NAV_OPTIONS : WITHOUT_AUTH_NAV_OPTIONS).map(
                ({ label, path }) => (
                  <NavItem key={path} path={path} label={label} />
                ),
              )}
              <NavAdmin />
            </nav>
          </Dialog>,
          portalRoot,
        )}
    </>
  );
}
