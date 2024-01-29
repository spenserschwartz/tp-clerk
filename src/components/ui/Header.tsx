import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";

import { HeaderLogo, MobileMenu } from "./index";
import { headerNavigation } from "./utils";

export default function Header() {
  const { user } = useUser();
  const [top, setTop] = useState<boolean>(true);

  // Detect whether user has scrolled the page down by 10px
  const scrollHandler = () => {
    window.scrollY > 10 ? setTop(false) : setTop(true);
  };

  // Scroll effect on header
  useEffect(() => {
    scrollHandler();
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  return (
    <header
      className={`fixed z-30 w-full px-2 transition duration-300 ease-in-out md:bg-opacity-90 md:px-10 lg:px-20 ${
        !top ? "bg-white shadow-lg backdrop-blur-sm" : ""
      }`}
    >
      <div className="mx-auto">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Site branding */}
          <Link
            className="flex flex-1 items-center align-middle md:justify-start"
            href="/"
            aria-label="TravelPerfect"
            passHref
            legacyBehavior
          >
            <HeaderLogo />
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex">
            {/* Desktop sign in links */}
            <ul className="flex grow flex-wrap items-center justify-end">
              {/* Header Navigation Links */}
              <div className="flex grow flex-wrap items-center">
                {headerNavigation(user).links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="flex px-5 py-3 font-medium text-gray-600 transition duration-150 ease-in-out hover:text-gray-900"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </div>
            </ul>
          </nav>

          <div className="hidden md:flex md:flex-1 md:justify-end">
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              {/* Header Sign In Links */}
              <Link
                href="/sign-in"
                className="flex items-center px-5 py-3 font-medium text-gray-600 transition duration-150 ease-in-out hover:text-gray-900"
              >
                Sign in
              </Link>

              {/* Header Sign Up */}
              <Link
                href="/sign-in"
                className="btn-sm ml-3 bg-gray-900 text-gray-200 hover:bg-gray-800"
              >
                <span>Sign up</span>
                <svg
                  className="-mr-1 ml-2 h-3 w-3 shrink-0 fill-current text-gray-400"
                  viewBox="0 0 12 12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
                    fillRule="nonzero"
                  />
                </svg>
              </Link>
            </SignedOut>
          </div>

          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
