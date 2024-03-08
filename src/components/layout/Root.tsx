import { type PropsWithChildren } from "react";
import { Breadcrumbs, Footer, Header } from "~/components/ui";

// Todo: add font-inter to global styles

export const RootLayout = (props: PropsWithChildren) => {
  return (
    <div className="bg-white tracking-tight text-gray-900 antialiased">
      <Header />
      <div className="flex min-h-screen flex-col items-center overflow-hidden supports-[overflow:clip]:overflow-clip">
        {/* Padding is also in header component, localized because of fixed position */}
        <div className="w-full px-2 md:px-10 lg:px-20">
          {/* Spacing between header and main content */}
          <div className="mb-24 md:mb-20" />

          <Breadcrumbs />

          {/* Main Content */}
          <main className="border border-red-400">{props.children}</main>
        </div>

        {/* Grow the page so that footer is at bottom of page if there is no scroll */}
        <div className="flex-grow"></div>

        <Footer />
      </div>
    </div>
  );
};
