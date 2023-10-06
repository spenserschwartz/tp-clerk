import Link from "next/link";
import { useEffect, useState } from "react";

const navigation = [
  { name: "Quick Launch", href: "/quick-launch" },
  { name: "Cities", href: "/cities" },
  { name: "London", href: "/city/london" },
  { name: "Berlin", href: "/city/berlin" },
  { name: "About", href: "/about" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [top, setTop] = useState<boolean>(true);

  // detect whether user has scrolled the page down by 10px
  const scrollHandler = () => {
    window.scrollY > 10 ? setTop(false) : setTop(true);
  };

  useEffect(() => {
    scrollHandler();
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  return (
    <header
      className={`fixed z-30 w-full transition duration-300 ease-in-out md:bg-opacity-90 ${
        !top ? "bg-white shadow-lg backdrop-blur-sm" : ""
      }`}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Site branding */}
          <div className="mr-4 shrink-0 border-2 border-red-300">
            <Link href="/">
              <span className="sr-only">TravelPerfect</span>

              <p className="text-2xl font-bold text-white">TravelPerfect</p>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">
            {/* Desktop sign in links */}
            <ul className="flex grow flex-wrap items-center justify-end">
              <li>
                <Link
                  href="/signin"
                  className="flex items-center px-5 py-3 font-medium text-gray-600 transition duration-150 ease-in-out hover:text-gray-900"
                >
                  Sign in
                </Link>
              </li>
              <li>
                <Link
                  href="/signup"
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
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
