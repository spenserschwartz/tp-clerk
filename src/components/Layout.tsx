import { type PropsWithChildren } from "react";
import { Footer, Header } from "~/components/ui";
import Breadcrumbs from "./ui/Breadcrumbs";

// Todo: add font-inter to global styles

export const RootLayout = (props: PropsWithChildren) => {
  return (
    <div className="bg-white tracking-tight text-gray-900 antialiased">
      <div className="flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
        <Header />

        {/* Padding is also in header component, localized because of fixed position */}
        <div className="px-2 md:px-10 lg:px-20">
          {/* Spacing between header and main content */}
          <div className="mb-24 md:mb-20" />

          <Breadcrumbs />

          {/* Main Content */}
          <main className="">{props.children}</main>
        </div>

        {/* Grow the page so that footer is at bottom of page if there is no scroll */}
        <div className="flex-grow"></div>

        <Footer />
      </div>
    </div>
  );
};
