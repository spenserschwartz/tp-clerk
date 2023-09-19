import type { RouterOutputs } from "~/utils/api";

export const displayCityName = (city: string): string => {
  return city
    .split("_") // split from underscores
    .map((word) => word.charAt(0).toUpperCase() + word.substring(1)) // capitalize first letter
    .join(" "); // join back to string
};

type GetReccomendedDaysByCityType =
  RouterOutputs["recommendedDaysInCity"]["getAllByCity"];

export const findAverageRecDays = (
  allCityRecs: GetReccomendedDaysByCityType | undefined
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
