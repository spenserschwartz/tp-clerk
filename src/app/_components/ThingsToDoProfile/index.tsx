"use client";

import { APIProvider as GoogleAPIProvider } from "@vis.gl/react-google-maps";
import type { PlaceResult, PlaceResultWithLatLng } from "~/types/google";

import { ThingsToDoTitle } from "@/components";

interface ThingsToDoDetailsProps {
  placeResult?: PlaceResultWithLatLng;
}

const ThingsToDoDetails = ({
  googleData,
  placeResult,
}: ThingsToDoDetailsProps) => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  console.log("googleData", googleData);
  console.log("placeResult", placeResult);

  if (!apiKey) return null;
  return (
    <GoogleAPIProvider apiKey={apiKey}>
      <div className="flex w-full flex-grow justify-center">
        <div className="flex w-full flex-grow flex-col items-center">
          <ThingsToDoTitle title={placeResult?.formatted_address ?? ""} />

          {/* <PlacesProfileDetails
            databaseData={databaseData}
            tripAdvisorData={tripAdvisorData}
          /> */}
        </div>
      </div>
    </GoogleAPIProvider>
  );
};

export default ThingsToDoDetails;
