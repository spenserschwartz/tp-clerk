"use client";
import {
  APIProvider as GoogleAPIProvider,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

import { ImageGallery } from "@/components";
import type { PlaceResult, PlacesService } from "~/types/google";
import type {
  AttractionByNameType,
  GetTripAdvisorDetailsType,
} from "~/types/router";
import { type LocationDetails } from "~/types/tripAdvisor";
// import { PlaceDetails, PlaceTitle } from "./components";

interface PlacesProfileProps {
  databaseData?: AttractionByNameType;
  tripAdvisorData?: GetTripAdvisorDetailsType;
}

const PlacesProfile = ({
  databaseData,
  tripAdvisorData,
}: PlacesProfileProps) => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const placesLib = useMapsLibrary("places");
  const [googleData, setGoogleData] = useState<PlaceResult | undefined>(
    undefined,
  );
  const [placeResult, setPlaceResult] = useState<PlaceResult | undefined>(
    undefined,
  );
  const { tripAdvisorLocationId } = databaseData ?? {};
  const [images, setImages] = useState<string[]>([]);

  const [placesService, setPlacesService] = useState<PlacesService | null>(
    null,
  );

  console.log("PP databaseData:", databaseData);
  console.log("PP tripAdvisorData:", tripAdvisorData);

  // Correctly initializing PlacesService with a div element
  useEffect(() => {
    if (!placesLib) return;
    const map = new google.maps.Map(document.createElement("div"));
    setPlacesService(new placesLib.PlacesService(map));
  }, [placesLib]);

  // Fetch details from Google Places API
  useEffect(() => {
    if (!placesService || !databaseData) return;
    const request = {
      placeId: databaseData.googlePlaceId ?? "",
      fields: [
        "name",
        "rating",
        "formatted_phone_number",
        "geometry",
        "user_ratings_total",
        "url",
        "website",
        "photos",
        "vicinity",
      ],
    };

    placesService.getDetails(request, (result, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && result) {
        setPlaceResult(result);
        const photos = result?.photos?.map((photo) => {
          return photo.getUrl();
        });
        setImages(photos?.slice(0, 5) ?? []);
      } else {
        console.log("Failed to fetch place details:", status);
      }
    });
  }, [placesService, databaseData]);

  if (!databaseData || !apiKey) return null;
  return (
    <GoogleAPIProvider apiKey={apiKey}>
      <div className="flex w-full flex-grow justify-center">
        <div className="flex w-full flex-grow flex-col items-center">
          {/* <PlaceTitle data={databaseData} />

          {images && <ImageGallery images={images} />}

          <PlaceDetails
            databaseData={databaseData}
            googleData={googleData}
            tripAdvisorData={tripAdvisorData}
          /> */}
        </div>
      </div>
    </GoogleAPIProvider>
  );
};

export default PlacesProfile;
