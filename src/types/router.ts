import { type RouterOutputs } from "~/utils/api";

export type AttractionType = RouterOutputs["attractions"]["getAll"][0];

export type GetCityByNameType = RouterOutputs["city"]["getCityByName"];

export type GetUpvotesByUserInCityType =
  RouterOutputs["upvotes"]["getAllByUserInCity"];
