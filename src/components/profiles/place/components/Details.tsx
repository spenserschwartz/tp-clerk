import { GoogleIcon } from "public/icons";
import React from "react";

import { StarRatings } from "~/components";
import { type AttractionByNameType } from "~/types/router";

interface PlaceDetailsProps {
  databaseData: AttractionByNameType;
}

const PlaceDetails = ({ databaseData }: PlaceDetailsProps) => {
  if (!databaseData) return null;
  const { description } = databaseData;

  return (
    <>
      <StarRatings value={2.5} />
      <GoogleIcon />
    </>
  );
};

export default PlaceDetails;
