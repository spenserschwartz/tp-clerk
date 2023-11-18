import { type RouterOutputs } from "~/utils/api";

/*
    ATTRACTION
*/
export type AttractionType = RouterOutputs["attractions"]["getAll"][0];

/*
    CITY
*/
export type GetCityByNameType = RouterOutputs["city"]["getCityByName"];

/*
    ITINERARY
*/
export type ItineraryType = RouterOutputs["itinerary"]["getAll"][0];

export type ItineraryWithCityInfoType =
  RouterOutputs["itinerary"]["getAllWithCityInfo"][0];

/*
    UPVOTES
*/
export type GetUpvotesByUserInCityType =
  RouterOutputs["upvotes"]["getAllByUserInCity"];
