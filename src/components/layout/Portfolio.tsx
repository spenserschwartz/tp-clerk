import { type PropsWithChildren } from "react";
import { Footer } from "../portfolio/Footer";
import { Header } from "../portfolio/Header";
import { ThemeProvider } from "../portfolio/ThemeProvider";

const PortfolioLayout = (props: PropsWithChildren) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <div className="flex h-full min-h-screen bg-zinc-50 dark:bg-black">
        {/* Inner Layout */}
        <>
          <div className="fixed inset-0 flex justify-center sm:px-8">
            <div className="flex w-full max-w-7xl lg:px-8">
              <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
            </div>
          </div>
          <div className="relative flex w-full flex-col">
            <Header />
            <main className="flex-auto">{props.children}</main>
            <Footer />
          </div>
        </>
      </div>
    </ThemeProvider>
  );
};

export default PortfolioLayout;