import type { PropsWithChildren } from "react";
import Header from "./header";

// import { Inter } from "next/font/google";

// const inter = Inter({
//   subsets: ["latin"],
//   variable: "--font-inter",
//   display: "swap",
// });

// className={`${inter.variable} font-inter bg-white tracking-tight text-gray-900 antialiased`}

export const PageLayout = (props: PropsWithChildren) => {
  return (
    <body
      className={`font-inter bg-white tracking-tight text-gray-900 antialiased`}
    >
      <div className="flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
        <Header />
        {props.children}
      </div>
    </body>
  );
};
