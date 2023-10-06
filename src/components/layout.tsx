import AOS from "aos";
import "aos/dist/aos.css";
import type { PropsWithChildren } from "react";
import { useEffect } from "react";
import Header from "./ui/header";

// Todo: add font-inter to global styles

export const RootLayout = (props: PropsWithChildren) => {
  // AOS, animate on scroll
  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 700,
      easing: "ease-out-cubic",
    });
  });

  return (
    <div className="bg-white tracking-tight text-gray-900 antialiased">
      <div className="flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
        <Header />
        {props.children}
      </div>
    </div>
  );
};
