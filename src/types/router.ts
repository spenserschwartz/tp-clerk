import { type RouterOutputs } from "~/trpc/server";

/*
    ATTRACTION
*/
export type AttractionType = RouterOutputs["attractions"]["getAll"][0];

export type AttractionByNameType = RouterOutputs["attractions"]["getByName"];

/*
    CITY
*/
export type GetCityDataByNameType = RouterOutputs["city"]["getCityDataByName"];

/*
    ITINERARY
*/
export type ItineraryType = RouterOutputs["itinerary"]["getAll"][0];

export type ItineraryWithCityInfoType =
  RouterOutputs["itinerary"]["getAllWithCityInfo"][0];

/*
    LIKES
*/
export type GetAllLikesByUserInCityType =
  RouterOutputs["likes"]["getAllByUserInCity"][0];

/*
    RECOMMENDED DAYS IN CITY
*/
export type GetRecommendedDaysByCityType =
  RouterOutputs["recommendedDaysInCity"]["getAllByCity"];

/*
    TRIPADVISOR
*/
export type GetTripAdvisorDetailsType =
  RouterOutputs["tripAdvisor"]["getLocationDetails"];

/*
    UPVOTES
*/
export type GetUpvotesByUserInCityType =
  RouterOutputs["upvotes"]["getAllByUserInCity"];
