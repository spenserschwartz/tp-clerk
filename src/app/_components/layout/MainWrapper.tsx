"use client";
import { usePathname } from "next/navigation";
import { getFirstPathnameSegment } from "~/lib/utils";
import { layoutStyles, routeLayouts } from "./utils";

interface MainWrapperProps {
  children: React.ReactNode;
}

const MainWrapper = ({ children }: MainWrapperProps) => {
  const pathname = usePathname();
  const firstSegment = getFirstPathnameSegment(pathname);
  const extraStyles =
    !!firstSegment && firstSegment in routeLayouts
      ? layoutStyles[routeLayouts[firstSegment] ?? ""]
      : "";

  // Conditional for padding
  const paddingStyles = pathname === "/" ? "" : "px-2 md:px-10 lg:px-20";

  return (
    <main className="flex w-full flex-1 justify-center overflow-hidden supports-[overflow:clip]:overflow-clip">
      <div className={`w-full ${extraStyles} ${paddingStyles}`}>{children}</div>
    </main>
  );
};

export default MainWrapper;
