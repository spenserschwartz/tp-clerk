import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  RequestOptionType,
  type AutocompleteRequest,
  type LatLng,
} from "~/types/google";
import type { GetRecommendedDaysByCityType } from "~/types/router";

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

// Function to convert name to slug e.g. New York City -> new-york-city
export const convertNameToSlug = (name: string) => {
  return name.replace(/\s/g, "-").toLowerCase();
};

// Function to convert slug to display/database name e.g. new-york-city -> New York City
export const convertSlugToDatabaseName = (slug: string) => {
  return slug
    .split("-")
    .map((word, index, array) =>
      (word === "of" || word === "the") && index !== 0 && index !== array.length
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join(" ")
    .trim();
};

export function createAutoCompleteRequestOptions(
  requestOptionType: RequestOptionType,
  input?: string,
  location?: LatLng,
  radius?: number,
  googleMaps?: typeof google.maps,
): AutocompleteRequest {
  switch (requestOptionType) {
    case RequestOptionType.Cities:
      return {
        input: input ?? "",
        types: ["(cities)"],
      };
    case RequestOptionType.Establishment:
      if (!location || !googleMaps)
        throw new Error("Location must be provided");
      return {
        input: input ?? "",
        types: ["establishment"],
        location: new googleMaps.LatLng(location.lat, location.lng),
        radius: radius ?? 10000, // default radius if not provided
      };

    default:
      throw new Error("Invalid search type");
  }
}

export const getAverageDaysFromCityRecs = (
  allCityRecs: GetRecommendedDaysByCityType,
) => {
  if (!allCityRecs ?? !allCityRecs?.length) return undefined;
  // Find average
  const sum = allCityRecs.reduce((acc, rec) => acc + rec.recommendedDays, 0);
  const average = sum / allCityRecs.length;

  // Return average as a window of days
  if (average <= 1) return "~1 day";
  else {
    if (average % 1 === 0) return `~${average} days`;
    else return `${Math.floor(average)} - ${Math.ceil(average)} days`;
  }
};

// Sort without prefix
export const sortWithoutPrefix = (titles: string[] | undefined) => {
  if (!titles?.length) return [];

  return titles.sort((a, b) => {
    const removeThe = (title: string) =>
      title.startsWith("The ") || title.startsWith("the ")
        ? title.substring(4)
        : title;

    // Apply the function to both titles
    const adjustedA = removeThe(a);
    const adjustedB = removeThe(b);

    // Compare the adjusted titles
    return adjustedA.localeCompare(adjustedB);
  });
};
