import Link from "next/link";
import { forwardRef } from "react";
import { Logo } from "./index";

interface HeaderLogoProps {
  onClick?: () => void;
  href?: string;
}

const HeaderLogo = forwardRef<HTMLDivElement, HeaderLogoProps>(() => {
  return (
    <Link
      className="flex items-center align-middle md:justify-start"
      href="/"
      aria-label="TravelPerfect"
      passHref
      legacyBehavior
    >
      <div className="flex cursor-pointer items-center align-middle md:justify-start">
        <Logo />

        {/* Title */}
        <h1 className="leading-tigher flex items-center text-3xl font-extrabold tracking-tighter md:text-4xl">
          Travel
          <span className="bg-gradient-to-r from-purple-500 to-violet-400 bg-clip-text text-transparent">
            Perfect
          </span>
        </h1>
      </div>
    </Link>
  );
});
HeaderLogo.displayName = "HeaderLogo";

export default HeaderLogo;
