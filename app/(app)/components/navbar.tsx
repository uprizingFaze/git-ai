"use client";

import Icon from "@/components/icon";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import TeamSwitcher from "./team-switcher";

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
              className={`text-muted-foreground ${
                pathname === "/" ? "dark:text-white text-black" : ""
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/docs"
              className={`text-muted-foreground ${
                pathname === "/docs" ? "dark:text-white text-black" : ""
              }`}
            >
              Docs
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className={`text-muted-foreground ${
                pathname === "/about" ? "dark:text-white text-black" : ""
              }`}
            >
              About
            </Link>
          </li>
        </ul>
        <li className="ml-auto">
          <TeamSwitcher />
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
