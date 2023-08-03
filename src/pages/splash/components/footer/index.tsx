import React from "react";
import { footerNavigation } from "./utils";

const Footer = () => {
  return (
    <footer aria-labelledby="footer-heading" className="relative">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-4 lg:px-8">
        <div className="border-t border-white/10 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            {footerNavigation.social.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-500 hover:text-gray-400"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon aria-hidden="true" />
              </a>
            ))}
          </div>
          <p className="mt-8 text-xs leading-5 text-gray-400 md:order-1 md:mt-0">
            &copy; 2023 Spenser Schwartz, All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
