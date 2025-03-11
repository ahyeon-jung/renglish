"use client";

import { useEffect, useState } from "react";

import Dialog from "../Dialog";
import { LayoutGrid } from "lucide-react";
import NavItem from "../NavItem";
import { PATHS } from "@/constants/path";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";

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
              <NavItem path={PATHS.HOME} label="home" />
              <NavItem path={PATHS.MOVIE_LIST} label="movies" />
            </nav>
          </Dialog>,
          document.body
        )}
    </>
  );
}
