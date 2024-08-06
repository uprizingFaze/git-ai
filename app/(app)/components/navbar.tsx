"use client";

import { SiGithub, SiTwitter } from "react-icons/si";
import Icon from "@/components/icon";
import { Button } from "@/components/ui/button";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { ModeToggle } from "@/components/mode-toggle";

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
              href="/chat"
              className={`text-muted-foreground ${
                pathname === "/chat" ? "dark:text-white text-black" : ""
              }`}
            >
              chat
            </Link>
          </li>
          <li>
            <Link
              href="/prompts"
              className={`text-muted-foreground ${
                pathname === "/prompts" ? "dark:text-white text-black" : ""
              }`}
            >
              prompts
            </Link>
          </li>
        </ul>
        <li className="flex-shrink-0 mx-1">
          <Link href="https://github.com/uprizingFaze/git-ai">
            <Button variant="ghost">
              <SiGithub className="w-6 h-6" />
            </Button>
          </Link>
        </li>
        <li className="flex-shrink-0 mx-1">
          <Link href="https://x.com/uprizingFaze">
            <Button variant="ghost">
              <SiTwitter className="w-6 h-6" />
            </Button>
          </Link>
        </li>
        <li className="flex-shrink-0 mx-1">
          <ModeToggle />
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
