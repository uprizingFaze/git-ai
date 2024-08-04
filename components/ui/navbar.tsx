"use client";

import { SiGithub, SiTwitter } from "react-icons/si";
import Icon from "../icon";
import { Button } from "./button";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";

function Nav() {
  const pathname = usePathname();
  return (
    <nav className="fixed top-10 inset-x-0 max-w-3xl mx-auto z-50">
      <ul className="dark:bg-black bg-white flex items-center py-3  px-8 border rounded-xl">
        <li className="flex-shrink-0">
          <Link href="/">
            <Icon />
          </Link>
        </li>
        <ul className="flex-1 flex justify-center space-x-4">
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
              about
            </Link>
          </li>
        </ul>
        <li className="flex-shrink-0 mx-1">
          <Button variant="ghost">
            <SiGithub className="w-6 h-6"/>
          </Button>
        </li>
        <li className="flex-shrink-0 mx-1">
          <Button variant="ghost">
            <SiTwitter className="w-6 h-6"/>
          </Button>
        </li>
        <li className="flex-shrink-0 mx-1">
          <Button>
            Vamos!!
          </Button>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
