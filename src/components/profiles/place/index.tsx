import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";

import { ImageGallery } from "~/components";
import type { PlaceResult, PlacesService } from "~/types/google";
import { type AttractionByNameType } from "~/types/router";
import { type LocationDetails } from "~/types/tripAdvisor";
import { PlaceDetails, PlaceTitle } from "./components";

interface PlacesProfileProps {
  databaseData?: AttractionByNameType;
}

const PlacesProfile = ({ databaseData }: PlacesProfileProps) => {
  const [tripAdvisorData, setTripAdvisorData] = useState<
    LocationDetails | undefined
  >(undefined); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [placeResult, setPlaceResult] = useState<PlaceResult | undefined>(
    undefined
  );
  const { tripAdvisorLocationId, googlePlaceId } = databaseData ?? {};
  const [images, setImages] = useState<string[]>([]);

  const placesLib = useMapsLibrary("places");
  const [sessionToken, setSessionToken] =
    useState<google.maps.places.AutocompleteSessionToken>();
  const [placesService, setPlacesService] = useState<PlacesService | null>(
    null
  );

  const { data: fetchedTripAdvisorData, error: tripAdvisorError } =
    api.tripAdvisor.getLocationDetails.useQuery(
      { locationId: tripAdvisorLocationId ?? "" },
      {
        enabled: !!databaseData,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
      }
    );

  const { data: secondFetchedGoogleData, error: secondGoogleError } =
    api.google.searchByText.useQuery({
      query: "Chrysler Building, New York",
    });

  console.log("secondFetchedGoogleData", secondFetchedGoogleData);

  // We need ratings and userRatingCount if it wasn't populated on first fetch
  useEffect(() => {
    if (placeResult && secondFetchedGoogleData) {
      if (secondGoogleError)
        console.error("Error fetching Google data:", secondGoogleError);
      else {
        if ("error" in secondFetchedGoogleData)
          console.error(
            "Error fetching Google data:",
            secondFetchedGoogleData.error
          );
        else {
          const { rating, user_ratings_total } =
            secondFetchedGoogleData.candidates[0] ?? {};

          const newPlaceResult: PlaceResult = {
            ...placeResult,
            rating,
            user_ratings_total,
          };
          setPlaceResult(newPlaceResult);
        }
      }
    }
  }, [placeResult, secondFetchedGoogleData, secondGoogleError]);

  // Fetch details from TripAdvisor API
  useEffect(() => {
    if (tripAdvisorError) {
      console.error("Error fetching TripAdvisor data:", tripAdvisorError);
      setTripAdvisorData(undefined);
    } else if (fetchedTripAdvisorData && !("error" in fetchedTripAdvisorData)) {
      setTripAdvisorData(fetchedTripAdvisorData);
    }
  }, [fetchedTripAdvisorData, tripAdvisorError]);

  // Correctly initializing PlacesService with a div element
  useEffect(() => {
    if (!placesLib) return;

    const map = new google.maps.Map(document.createElement("div"));
    setPlacesService(new placesLib.PlacesService(map));
    setSessionToken(new placesLib.AutocompleteSessionToken());
  }, [placesLib]);

  useEffect(() => {
    if (!placesService || !databaseData) return;
    //
    const placeId = databaseData.googlePlaceId ?? ""; // Example place ID
    const request = {
      placeId,
      // fields: [
      //   "name",
      //   "rating",
      //   "formatted_phone_number",
      //   "geometry",
      //   "user_ratings_total",
      //   "url",
      //   "website",
      //   "photos",
      // ],
      sessionToken,
    };

    // Using the placesService to fetch details
    placesService.getDetails(request, (result, status) => {
      console.log("PlaceService status", status);
      if (status === google.maps.places.PlacesServiceStatus.OK && result) {
        console.log("Place details:", result);
        setPlaceResult(result);
        const photos = result?.photos?.map((photo) => {
          return photo.getUrl();
        });
        setImages(photos?.slice(0, 5) ?? []);
      } else {
        console.log("Failed to fetch place details:", status);
      }
    });
  }, [placesService, databaseData, sessionToken]);

  if (!databaseData) return null;
  return (
    <div className="flex w-full flex-grow justify-center">
      <div className="flex w-full flex-grow flex-col items-center">
        <PlaceTitle data={databaseData} />

        {images && <ImageGallery images={images} />}

        <PlaceDetails
          databaseData={databaseData}
          googleData={placeResult}
          tripAdvisorData={tripAdvisorData}
        />
      </div>
    </div>
  );
};

export default PlacesProfile;
