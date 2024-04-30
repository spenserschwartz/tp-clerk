"use client";

import { APIProvider as GoogleAPIProvider } from "@vis.gl/react-google-maps";

import { ThingsToDoDetails, ThingsToDoTitle } from "@/components";

import type { PlaceResultWithLatLng } from "~/types/google";
import type { GetAllLikesByUserInCityType } from "~/types/router";

interface ThingsToDoDetailsProps {
  allLikesByUserInCity: GetAllLikesByUserInCityType[];
  placeResult?: PlaceResultWithLatLng;
}

const ThingsToDoProfile = ({
  allLikesByUserInCity,
  placeResult,
}: ThingsToDoDetailsProps) => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) return null;
  return (
    <GoogleAPIProvider apiKey={apiKey}>
      <div className="flex w-full flex-grow justify-center">
        <div className="flex w-full flex-grow flex-col items-center">
          <ThingsToDoTitle title={placeResult?.formatted_address ?? ""} />

          {/* <ThingsToDoDetails
            allLikesByUserInCity={allLikesByUserInCity}
            googleCityName={placeResult?.formatted_address ?? ""}
          /> */}
        </div>
      </div>
    </GoogleAPIProvider>
  );
};

export default ThingsToDoProfile;
