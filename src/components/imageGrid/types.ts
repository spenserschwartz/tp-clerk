import type { RouterOutputs } from "~/utils/api";

type GetCityByNameType = RouterOutputs["city"]["getCityByName"];
type GetUpvotesByUserInCityType =
  RouterOutputs["upvotes"]["getAllByUserInCity"];

export interface ImageGridProps {
  cityData: GetCityByNameType;
  filterInputValue?: string;
  userUpvoteData: GetUpvotesByUserInCityType | undefined; // undefined if user is not logged in
}

export type UserUpvoteMemo = Record<string, boolean>;
