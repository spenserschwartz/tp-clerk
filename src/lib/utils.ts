import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertFormattedAddressToUrlPath = (formattedAddress: string) => {
  // Split the address into parts, trim whitespace, convert to lowercase, replace spaces with hyphens
  const parts = formattedAddress
    .split(",")
    .map((part) => part.trim().toLowerCase().replace(/\s/g, "-"));

  // Reverse the order of parts and join with slashes to form the URL path
  const urlPath = "/" + parts.reverse().join("/");

  return urlPath;
};

// Function to convert slug to display/database name e.g. new-york-city -> New York City
export const convertSlugToDatabaseName = (slug: string) => {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
    .trim();
};
