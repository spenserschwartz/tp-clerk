"use client";

import { APIProvider as GoogleAPIProvider } from "@vis.gl/react-google-maps";

import { ThingsToDoDetails, ThingsToDoTitle } from "@/components";

import type { PlaceResult, PlaceResultWithLatLng } from "~/types/google";
import type { GetAllLikesByUserInCityType } from "~/types/router";

interface ThingsToDoDetailsProps {
  allLikesByUserInCity: GetAllLikesByUserInCityType[];
  googleData: PlaceResult | { error: string };
  placeResult?: PlaceResultWithLatLng;
}

const ThingsToDoProfile = ({
  allLikesByUserInCity,
  googleData,
  placeResult,
}: ThingsToDoDetailsProps) => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const googlePlaceId = placeResult?.place_id ?? "";

  if (!apiKey) return null;
  return (
    <GoogleAPIProvider apiKey={apiKey}>
      <div className="flex w-full flex-grow justify-center">
        <div className="flex w-full flex-grow flex-col items-center">
          <ThingsToDoTitle title={placeResult?.formatted_address ?? ""} />

          <ThingsToDoDetails
            allLikesByUserInCity={allLikesByUserInCity}
            googlePlaceId={googlePlaceId}
          />
        </div>
      </div>
    </GoogleAPIProvider>
  );
};

export default ThingsToDoProfile;
