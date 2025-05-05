"use client";

import { useEffect, useState } from "react";

import Dialog from "../Dialog";
import { LayoutGrid } from "lucide-react";
import NavItem from "../NavItem";
import { PATHS } from "@/constants/path";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { useUserStore } from "@/stores/userStore";

const DEFAULT_NAV_OPTIONS = [
  { label: "Home", path: PATHS.HOME },
  { label: "Introduce", path: PATHS.NOTICES.INTRODUCE },
  { label: "Weekly Expressions", path: PATHS.WEEKLY_EXPRESSIONS },
  { label: "Movies", path: PATHS.MOVIE.LIST },
  { label: "Studies", path: PATHS.STUDIES.LIST },
  { label: "Notices", path: PATHS.NOTICES.LIST },
];

const WITHOUT_AUTH_NAV_OPTIONS = [
  { label: "Login", path: PATHS.AUTH.LOGIN },
  { label: "Register", path: PATHS.AUTH.REGISTER },
];

const WITH_AUTH_NAV_OPTIONS = [
  { label: "My Page", path: PATHS.MY.HOME },
  { label: "Logout", path: PATHS.AUTH.LOGOUT },
];

export default function Nav() {
  const pathname = usePathname();
  const { userId } = useUserStore();

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
                {(userId ? WITH_AUTH_NAV_OPTIONS : WITHOUT_AUTH_NAV_OPTIONS).map(
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
