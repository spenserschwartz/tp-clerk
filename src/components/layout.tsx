import type { PropsWithChildren } from "react";
import Header from "./header";

// Todo: add font-inter to global styles

export const PageLayout = (props: PropsWithChildren) => {
  return (
    <div
      className={`font-inter bg-white tracking-tight text-gray-900 antialiased`}
    >
      <div className="flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
        <Header />
        {props.children}
      </div>
    </div>
  );
};
