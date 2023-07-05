import React, { useState, useEffect } from "react";
import DarkModeToggle from "../utils/DarkModeToggle";
import { useRouter } from "next/router";
import Link from "next/link";
import ConnectedMethods from "./ConnectedMethods";

const genericHamburgerLine =
  "h-1 w-6 my-0.5 rounded-full transition-all duration-300 bg-zinc-900 dark:bg-zinc-100";

const links = [{ path: "/", label: "SAC" }];
//   @ts-ignore
export default function Nav({ setPublicKey }) {
  const [scrolling, setScrolling] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const currentPage = router.pathname;

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div>
      <nav
        className={`fixed top-0 w-full bg-zinc-100 dark:bg-zinc-900 transition-all duration-300 ${
          scrolling
            ? "border-b border-zinc-900 dark:border-zinc-100"
            : "border-b border-zinc-100 dark:border-zinc-900"
        }`}
      >
        <div className="px-8 mx-auto max-w-7xl transition-all duration-300">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="hidden md:block">
                <div className="flex items-baseline ml-10 space-x-4">
                  {links.map((link) => (
                    <Link
                      key={link.path}
                      className={`${
                        currentPage === link.path
                          ? "text-zinc-900 dark:text-zinc-100"
                          : "text-zinc-300 dark:text-zinc-400"
                      } hover:text-zinc-900 dark:hover:text-zinc-100 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300`}
                      href={link.path}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="group flex ml-auto">
              <ConnectedMethods setPublicKey={setPublicKey} />

              <div className="md:relative fixed top-4 mt-1 left-3 md:top-0 md:left-0">
                <DarkModeToggle />
              </div>
            </div>
            <div className="flex -mr-6 md:hidden">
              <button
                className="flex flex-col h-10 w-10 rounded justify-center items-center group"
                onClick={toggleMobileMenu}
              >
                <div
                  className={`${genericHamburgerLine} ${
                    isMobileMenuOpen
                      ? "rotate-45 translate-y-1 opacity group-hover:opacity-100 mt-3"
                      : "opacity group-hover:opacity-100"
                  }`}
                />
                <div
                  className={`${genericHamburgerLine} ${
                    isMobileMenuOpen
                      ? "opacity-0"
                      : "opacity group-hover:opacity-100"
                  }`}
                />
                <div
                  className={`${genericHamburgerLine} ${
                    isMobileMenuOpen
                      ? "-rotate-45 -translate-y-3 opacity group-hover:opacity-100"
                      : "opacity group-hover:opacity-100"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div
        className={`${
          isMobileMenuOpen ? "block" : "hidden"
        } md:hidden fixed mt-16 inset-0 z-50`}
      >
        <div className="absolute top-0 left-0 w-full h-screen bg-zinc-100 dark:bg-zinc-900">
          <div className="p-4">
            {links.map((link) => (
              <Link
                key={link.path}
                onClick={toggleMobileMenu}
                className={`${
                  currentPage === link.path
                    ? "text-zinc-900 dark:text-zinc-100"
                    : "text-zinc-300 dark:text-zinc-400"
                } block mb-4 px-3 py-2 rounded-md text-base font-medium transition-all duration-300`}
                href={link.path}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
