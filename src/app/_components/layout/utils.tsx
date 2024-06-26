import type { UserResource } from "@clerk/types";
import { GitHubIcon, LinkedInIcon } from "../icons";

export const footerNavigation = {
  cities: [
    { name: "London", href: "/city/london" },
    { name: "Berlin", href: "/city/berlin" },
  ],

  socialMediaIcons: [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/spenser-schwartz/",
      icon: LinkedInIcon,
    },
    {
      name: "GitHub",
      href: "https://www.github.com/spenserschwartz",
      icon: GitHubIcon,
    },
  ],
};

export const headerNavigation = (user: UserResource | null | undefined) => {
  const { id } = user ?? { id: "" }; // profile page is /user/:id

  return {
    links: [
      { name: "My Profile", href: `/user/${id}` },
      { name: "Quick Launch", href: "/quick-launch" },
      { name: "City Search", href: "/city-search" },
      { name: "London", href: "/city/london" },
      // { name: "Berlin", href: "/city/berlin" },
    ],
  };
};

export const layoutStyles: Record<string, string> = {
  focus: "max-w-7xl",
};

export const routeLayouts: Record<string, string> = {
  places: "focus",
};
