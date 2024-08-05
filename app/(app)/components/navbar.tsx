"use client";

import Icon from "@/components/icon";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";

function Nav() {
  const pathname = usePathname();
  return (
    <nav className="fixed top-10 inset-x-0 max-w-3xl mx-auto z-50">
      <ul className="dark:bg-black bg-white flex items-center py-3 px-8 border rounded-xl">
        <li className="flex-shrink-0">
          <Link href="/">
            <Icon />
          </Link>
        </li>
        <ul className="flex-1 flex items-center justify-center space-x-4">
          <li>
            <Link
              href="/"
              className={`text-muted-foreground hover:text-black dark:hover:text-white ${
                pathname === "/" ? "dark:text-white text-black" : ""
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/chat"
              className={`text-muted-foreground hover:text-black dark:hover:text-white ${
                pathname === "/chat" ? "dark:text-white text-black" : ""
              }`}
            >
              chat
            </Link>
          </li>
          <li>
            <Link
              href="/ui"
              className={`text-muted-foreground hover:text-black dark:hover:text-white ${
                pathname === "/ui" ? "dark:text-white text-black" : ""
              }`}
            >
              ui
            </Link>
          </li>
        </ul>
        <li className="ml-auto">
          {/* <RepoSwitcher /> */}
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
