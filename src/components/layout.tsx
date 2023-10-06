import type { PropsWithChildren } from "react";
import Header from "./ui/header";

// Todo: add font-inter to global styles
// Todo: aos

export const RootLayout = (props: PropsWithChildren) => {
  return (
    <div className="bg-white tracking-tight text-gray-900 antialiased">
      <div className="flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
        <Header />
        {props.children}
      </div>
    </div>
  );
};
