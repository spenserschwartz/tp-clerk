"use client";

import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { Transition } from "@headlessui/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function MobileMenu() {
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);

  const trigger = useRef<HTMLButtonElement>(null);
  const mobileNav = useRef<HTMLDivElement>(null);

  // Close the mobile menu on click outside
  useEffect(() => {
    const clickHandler = ({ target }: { target: EventTarget | null }): void => {
      if (!mobileNav.current || !trigger.current) return;
      if (
        !mobileNavOpen ||
        mobileNav.current.contains(target as Node) ||
        trigger.current.contains(target as Node)
      )
        return;
      setMobileNavOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // Close the mobile menu if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: { keyCode: number }): void => {
      if (!mobileNavOpen || keyCode !== 27) return;
      setMobileNavOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div className="flex md:hidden">
      {/* Hamburger button */}
      <button
        ref={trigger}
        className={`hamburger ${mobileNavOpen && "active"}`}
        aria-controls="mobile-nav"
        aria-expanded={mobileNavOpen}
        onClick={() => setMobileNavOpen(!mobileNavOpen)}
      >
        <span className="sr-only">Menu</span>
        <svg
          className="h-6 w-6 fill-current text-gray-900"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect y="4" width="24" height="2" />
          <rect y="11" width="24" height="2" />
          <rect y="18" width="24" height="2" />
        </svg>
      </button>

      {/*Mobile navigation */}
      <div ref={mobileNav}>
        <Transition
          show={mobileNavOpen}
          as="nav"
          id="mobile-nav"
          className="absolute left-0 top-full z-20 h-screen w-full overflow-scroll bg-white pb-16"
          enter="transition ease-out duration-200 transform"
          enterFrom="opacity-0 -translate-y-2"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-out duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <ul className="px-5 py-2">
            <SignedIn>
              <SignOutButton>
                <li>
                  <Link
                    href="/"
                    className="flex w-full justify-center py-2 font-medium text-gray-600 hover:text-gray-900"
                    onClick={() => setMobileNavOpen(false)}
                  >
                    Sign Out
                  </Link>
                </li>
              </SignOutButton>
            </SignedIn>
            <SignedOut>
              <li>
                <SignInButton>
                  <Link
                    href="/"
                    className="flex w-full justify-center py-2 font-medium text-gray-600 hover:text-gray-900"
                    onClick={() => setMobileNavOpen(false)}
                  >
                    Sign in
                  </Link>
                </SignInButton>
              </li>
              <li>
                <SignInButton>
                  <Link
                    href="/"
                    className="btn-sm my-2 w-full bg-gray-900 text-gray-200 hover:bg-gray-800"
                    onClick={() => setMobileNavOpen(false)}
                  >
                    <span>Sign up</span>
                    <svg
                      className="-mr-1 ml-2 h-3 w-3 shrink-0 fill-current text-gray-400"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
                        fill="#999"
                        fillRule="nonzero"
                      />
                    </svg>
                  </Link>
                </SignInButton>
              </li>
            </SignedOut>
          </ul>
        </Transition>
      </div>
    </div>
  );
}
