import { type RouterOutputs } from "~/utils/api";

/*
    ATTRACTION
*/
export type AttractionType = RouterOutputs["attractions"]["getAll"][0];

export type AttractionByNameType = RouterOutputs["attractions"]["getByName"];

/*
    CITY
*/
export type GetCityByNameType = RouterOutputs["city"]["getCityDataByName"];

/*
    ITINERARY
*/
export type ItineraryType = RouterOutputs["itinerary"]["getAll"][0];

export type ItineraryWithCityInfoType =
  RouterOutputs["itinerary"]["getAllWithCityInfo"][0];

/*
    RECOMMENDED DAYS IN CITY
*/
export type GetRecommendedDaysByCityType =
  RouterOutputs["recommendedDaysInCity"]["getAllByCity"];

/*
    UPVOTES
*/
export type GetUpvotesByUserInCityType =
  RouterOutputs["upvotes"]["getAllByUserInCity"];
