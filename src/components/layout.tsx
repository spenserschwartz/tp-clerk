import type { PropsWithChildren } from "react";
import Header from "./header";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const PageLayout = (props: PropsWithChildren) => {
  return (
    // <>
    //   <main className="overflow-none flex h-screen flex-col items-center justify-center bg-purple-800">
    //     <Header />
    //     <div className="flex h-full w-full max-w-6xl flex-col overflow-auto rounded-xl border-2  border-slate-800 bg-blue-950 ">
    //       {props.children}
    //     </div>
    //     <Footer />
    //   </main>
    // </>

    <body
      className={`${inter.variable} font-inter bg-white tracking-tight text-gray-900 antialiased`}
    >
      <div className="flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
        <Header />
        {props.children}
      </div>
    </body>
  );
};
