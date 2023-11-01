import { type RouterOutputs } from "~/utils/api";

export type GetCityByNameType = RouterOutputs["city"]["getCityByName"];

export type GetUpvotesByUserInCityType =
  RouterOutputs["upvotes"]["getAllByUserInCity"];
