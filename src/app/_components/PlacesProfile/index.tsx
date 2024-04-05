"use client";
import { APIProvider as GoogleAPIProvider } from "@vis.gl/react-google-maps";

import { PlacesProfileDetails, PlacesProfileTitle } from "@/components";
import type {
  AttractionByNameType,
  GetTripAdvisorDetailsType,
} from "~/types/router";

interface PlacesProfileProps {
  databaseData?: AttractionByNameType;
  tripAdvisorData?: GetTripAdvisorDetailsType;
}

const PlacesProfile = ({
  databaseData,
  tripAdvisorData,
}: PlacesProfileProps) => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!databaseData || !apiKey) return null;
  return (
    <GoogleAPIProvider apiKey={apiKey}>
      <div className="flex w-full flex-grow justify-center">
        <div className="flex w-full flex-grow flex-col items-center">
          <PlacesProfileTitle data={databaseData} />

          <PlacesProfileDetails
            databaseData={databaseData}
            tripAdvisorData={tripAdvisorData}
          />
        </div>
      </div>
    </GoogleAPIProvider>
  );
};

export default PlacesProfile;
