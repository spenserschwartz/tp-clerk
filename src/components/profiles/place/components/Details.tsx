import { GoogleIcon } from "public/icons";
import React from "react";
import type { PlaceResult } from "~/types/google";

import { StarRatings } from "~/components";
import { type AttractionByNameType } from "~/types/router";
import { type LocationDetails as TripAdvisorLocationDetails } from "~/types/tripAdvisor";

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
  const { description: tripAdvisorDescription, address_obj } =
    tripAdvisorData ?? {};
  const { city, country } = address_obj ?? {};

  console.log("ta", tripAdvisorData);

  return (
    <div className="w-full ">
      <h2 className="text-xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
        {city}, {country}
      </h2>
    </div>
  );
};

export default PlaceDetails;
