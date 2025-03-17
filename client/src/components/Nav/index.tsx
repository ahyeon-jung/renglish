"use client";

import { useEffect, useState } from "react";

import Dialog from "../Dialog";
import { LayoutGrid } from "lucide-react";
import NavItem from "../NavItem";
import { PATHS } from "@/constants/path";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";

const DEFAULT_NAV_OPTIONS = [
  { label: "home", path: PATHS.HOME },
  { label: "introduce", path: PATHS.INTRODUCE },
  { label: "how to install", path: PATHS.NOTICES.INSTALL },
  { label: "movies", path: PATHS.MOVIE.LIST },
];

const UNPROTECTED_NAV_OPTIONS = [
  { label: "login", path: PATHS.AUTH.LOGIN },
  { label: "register", path: PATHS.AUTH.REGISTER },
];

export default function Nav() {
  const pathname = usePathname();
  const [isOpenNav, setIsOpenNav] = useState(false);

  const openNav = () => setIsOpenNav(true);
  const closeNav = () => setIsOpenNav(false);

  useEffect(() => {
    closeNav();
  }, [pathname]);

  return (
    <>
      <LayoutGrid onClick={openNav} className="cursor-pointer" />
      {isOpenNav &&
        createPortal(
          <Dialog isOpen={isOpenNav} onClose={closeNav}>
            <nav className="flex flex-col gap-2">
              {DEFAULT_NAV_OPTIONS.map(({ label, path }) => (
                <NavItem key={path} path={path} label={label} />
              ))}
              {UNPROTECTED_NAV_OPTIONS.map(({ label, path }) => (
                <NavItem key={path} path={path} label={label} />
              ))}
            </nav>
          </Dialog>,
          document.body
        )}
    </>
  );
}
