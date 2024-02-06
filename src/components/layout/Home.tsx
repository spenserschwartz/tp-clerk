import { type PropsWithChildren } from "react";
import { Footer, Header } from "~/components/ui";

const HomeLayout = (props: PropsWithChildren) => {
  return (
    <div className="bg-white tracking-tight text-gray-900 antialiased">
      <Header />
      <div className="flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
        {/* Spacing between header and main content */}
        <div className="mb-24 md:mb-20" />

        {/* Main Content */}
        <main className="">{props.children}</main>

        {/* Grow the page so that footer is at bottom of page if there is no scroll */}
        <div className="flex-grow"></div>
      </div>

      <Footer />
    </div>
  );
};

export default HomeLayout;
