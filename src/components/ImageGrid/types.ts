import type {
  GetCityDataByNameType,
  GetUpvotesByUserInCityType,
} from "~/types/router";

export interface ImageGridProps {
  cityData: GetCityDataByNameType;
  filterInputValue?: string;
  setIsMutating: (isMutating: boolean) => void;
  userUpvoteData: GetUpvotesByUserInCityType | undefined; // undefined if user is not logged in
}

export type UserUpvoteMemo = Record<string, boolean>;
