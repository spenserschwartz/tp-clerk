import { type LatLng } from "use-places-autocomplete";
import { RequestOptionType, type AutocompleteRequest } from "~/types/google";
import { type GetRecommendedDaysByCityType } from "~/types/router";

export function createRequestOptions(
  requestOptionType: RequestOptionType,
  input?: string,
  location?: LatLng,
  radius?: number
): AutocompleteRequest {
  switch (requestOptionType) {
    case RequestOptionType.Cities:
      return {
        input: input ?? "",
        types: ["(cities)"],
      };
    case RequestOptionType.Establishment:
      if (!location) throw new Error("Location must be provided");
      return {
        input: input ?? "",
        types: ["establishment"],
        location: new google.maps.LatLng(location.lat, location.lng),
        radius: radius ?? 10000, // default radius if not provided
      };

    default:
      throw new Error("Invalid search type");
  }
}

// const LONDON_COORDINATES = { lat: 51.5074, lng: -0.1278 }; // Central London coordinates
// const SEARCH_RADIUS = 10000; // 10 kilometers radius
// const requestOptions = createRequestOptions(
//   RequestOptionType.Establishment,
//   "", // Add the user's input here
//   LONDON_COORDINATES,
//   SEARCH_RADIUS
// );

// } = usePlacesAutocomplete({ requestOptions: { types: ["(cities)"] } });

export const displayCityName = (city: string | undefined): string => {
  if (!city) return "";

  return city
    .split("_") // split from underscores
    .map((word) => word.charAt(0).toUpperCase() + word.substring(1)) // capitalize first letter
    .join(" "); // join back to string
};

export const findAverageRecDays = (
  allCityRecs: GetRecommendedDaysByCityType | undefined
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

// Difference in days between two dates in MM/DD/YYYY format
export const findDifferenceInDays = (date1: string, date2: string) => {
  const diffInMs = Math.abs(
    new Date(date1).getTime() - new Date(date2).getTime()
  );
  return Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
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
