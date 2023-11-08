import {
  type GetCityByNameType,
  type GetUpvotesByUserInCityType,
} from "~/types/router";

export interface ImageGridProps {
  cityData: GetCityByNameType;
  filterInputValue?: string;
  userUpvoteData: GetUpvotesByUserInCityType | undefined; // undefined if user is not logged in
}

export type UserUpvoteMemo = Record<string, boolean>;
