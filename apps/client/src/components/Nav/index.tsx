"use client";

import { useEffect, useState } from "react";

import { PATHS } from "@/constants/path";
import { useUserStore } from "@/stores/userStore";
import { LayoutGrid } from "lucide-react";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import Dialog from "../Dialog";
import NavItem from "../NavItem";

const DEFAULT_NAV_OPTIONS = [
  { label: "Home", path: PATHS.HOME },
  { label: "Introduce", path: PATHS.NOTICES.INTRODUCE },
  { label: "Weekly Expressions", path: PATHS.WEEKLY_EXPRESSIONS },
  { label: "Movies", path: PATHS.MOVIE.LIST },
  { label: "Studies", path: PATHS.STUDIES.LIST },
  { label: "Notices", path: PATHS.NOTICES.LIST },
];

export default function Nav() {
  const { userId } = useUserStore();
  const pathname = usePathname();
  const [isOpenNav, setIsOpenNav] = useState(true);
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalRoot(document.body);
  }, []);

  const openNav = () => setIsOpenNav(true);
  const closeNav = () => setIsOpenNav(false);

  useEffect(() => {
    if (isOpenNav) {
      closeNav();
    }
  }, [pathname]);

  const authNavOptions = getAuthNavOptions(userId, pathname);

  return (
    <>
      <LayoutGrid onClick={openNav} className="cursor-pointer" />
      {isOpenNav &&
        portalRoot &&
        createPortal(
          <Dialog isOpen={isOpenNav} onClose={closeNav} color="gray-100">
            <nav className="flex flex-col gap-2">
              <div className="flex flex-col gap-2 bg-gray-100">
                {DEFAULT_NAV_OPTIONS.map(({ label, path }) => (
                  <NavItem key={path} path={path} label={label} />
                ))}
              </div>
              <div className="flex flex-col gap-2 absolute pl-8 pt-2 top-[230px] left-0 w-full bottom-0 bg-white">
                {authNavOptions.map(
                  ({ label, path }) => (
                    <NavItem key={path} path={path} label={label} />
                  ),
                )}
              </div>
            </nav>
          </Dialog>,
          portalRoot,
        )}
    </>
  );
}

function getAuthNavOptions(userId: string | null, pathname: string) {
  if (userId) {
    return [
      { label: "My Page", path: PATHS.MY.HOME },
      {
        label: "Logout",
        path: `${PATHS.AUTH.LOGOUT}?redirect=${encodeURIComponent(pathname)}`,
      },
    ];
  }

  return [
    {
      label: "Login",
      path: `${PATHS.AUTH.LOGIN}?redirect=${encodeURIComponent(pathname)}`,
    },
    { label: "Register", path: PATHS.AUTH.REGISTER },
  ];
}
