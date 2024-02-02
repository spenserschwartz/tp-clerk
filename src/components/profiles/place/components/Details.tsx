import { GoogleIcon } from "public/icons";
import React from "react";
import type { PlaceResult } from "~/types/google";

import { StarRatings } from "~/components";
import { type AttractionByNameType } from "~/types/router";
import { type LocationDetails as TripAdvisorLocationDetails } from "~/types/tripAdvisor";
import GoogleReviewBadge from "./GoogleReviewBadge";
import PlaceReviews from "./Reviews";
import TripAdvisorReviewBadge from "./TripAdvisorReviewBadge";

interface PlaceDetailsProps {
  databaseData: AttractionByNameType;
  googleData?: PlaceResult;
  tripAdvisorData?: TripAdvisorLocationDetails;
}

const PlaceDetails = ({
  databaseData,
  googleData,
  tripAdvisorData,
}: PlaceDetailsProps) => {
  if (!databaseData) return null;
  const { description } = databaseData;
  const { user_ratings_total, rating } = googleData ?? {};
  const {
    description: tripAdvisorDescription,
    address_obj,
    category,
    subcategory,
  } = tripAdvisorData ?? {};
  const { city, country } = address_obj ?? {};
  const categoryLocalizedName = category?.localized_name;
  const displayedCategories = [
    categoryLocalizedName,
    ...(subcategory
      ?.filter((subCat) => {
        const subCatName = subCat.localized_name;
        // Check if subCatName matches the categoryLocalizedName (singular or plural)
        return (
          subCatName !== categoryLocalizedName &&
          subCatName !== categoryLocalizedName + "s" &&
          subCatName !== categoryLocalizedName?.slice(0, -1)
        );
      })
      .map((subCat) => subCat.localized_name) ?? []),
  ].filter(Boolean);

  console.log("ta", tripAdvisorData);
  console.log("displayedCategories", displayedCategories);

  return (
    <div className="mt-4 w-full">
      <h2 className="text-xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
        {city}, {country}
      </h2>
      <h3>{displayedCategories.join(" • ")}</h3>

      <div className="flex pt-2">
        <div className="flex flex-1 items-center border-y border-gray-300 pt-2 text-gray-600">
          {tripAdvisorDescription}
        </div>

        <div className="flex flex-1 justify-end gap-2">
          <GoogleReviewBadge googleData={googleData} />
          <TripAdvisorReviewBadge tripAdvisorData={tripAdvisorData} />
        </div>
      </div>
    </div>
  );
};

export default PlaceDetails;
