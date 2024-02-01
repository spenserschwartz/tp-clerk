import { GoogleIcon } from "public/icons";
import React from "react";
import type { PlaceResult } from "~/types/google";

import { StarRatings } from "~/components";
import { type AttractionByNameType } from "~/types/router";

interface PlaceDetailsProps {
  databaseData: AttractionByNameType;
  googleData?: PlaceResult;
}

const PlaceDetails = ({ databaseData, googleData }: PlaceDetailsProps) => {
  if (!databaseData) return null;
  const { description } = databaseData;
  const { user_ratings_total, rating } = googleData ?? {};

  console.log("pr", googleData);
  console.log("rating", rating);

  return (
    <>
      <StarRatings value={rating ?? 0} />
      <GoogleIcon />
    </>
  );
};

export default PlaceDetails;
