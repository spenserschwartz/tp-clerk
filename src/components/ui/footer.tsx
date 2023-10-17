import { footerNavigation } from "./utils";

export default function Footer() {
  return (
    <footer>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Bottom area */}
        <div className="border-t border-gray-200 py-4 md:flex md:items-center md:justify-between md:py-8">
          {/* Social Media Icons */}
          <ul className="mb-4 flex justify-center space-x-8 md:order-1 md:mb-0 md:ml-4">
            {footerNavigation.socialMediaIcons.map((icon) => (
              <li key={`SocialMediaIcon-${icon.name}`} className="">
                <a
                  href={icon.href}
                  className="hover:bg-white-100 flex items-center justify-center rounded-full bg-white text-gray-600 shadow transition duration-150 ease-in-out hover:text-gray-900"
                  aria-label={icon.name}
                >
                  <icon.icon />
                </a>
              </li>
            ))}
          </ul>

          {/* Copyrights note */}
          <div className="mr-4 text-xs text-gray-600 sm:text-sm">
            &copy; Spenser Schwartz. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
