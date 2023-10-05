import type { PropsWithChildren } from "react";
import Footer from "./footer";
import Header from "./header";

export const PageLayout = (props: PropsWithChildren) => {
  return (
    <>
      <main className="overflow-none flex h-screen flex-col items-center justify-center bg-purple-800">
        <Header />
        <div className="flex h-full w-full max-w-6xl flex-col overflow-auto rounded-xl border-2  border-slate-800 bg-blue-950 ">
          {props.children}
        </div>
        <Footer />
      </main>
    </>
  );
};
