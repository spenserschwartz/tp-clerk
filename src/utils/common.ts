import type { RouterOutputs } from "~/utils/api";

export const displayCityName = (city: string | undefined): string => {
  if (!city) return "";

  return city
    .split("_") // split from underscores
    .map((word) => word.charAt(0).toUpperCase() + word.substring(1)) // capitalize first letter
    .join(" "); // join back to string
};

type GetRecomendedDaysByCityType =
  RouterOutputs["recommendedDaysInCity"]["getAllByCity"];

export const findAverageRecDays = (
  allCityRecs: GetRecomendedDaysByCityType | undefined
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
