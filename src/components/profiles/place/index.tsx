import { useEffect, useState } from "react";
import { api } from "~/utils/api";

import { ImageGallery } from "~/components";
import type { PlaceResult } from "~/types/google";
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

  // Fetch details from Google Places API
  useEffect(() => {
    const fetchDetails = () => {
      if (!databaseData) return;

      // https://developers.google.com/maps/documentation/javascript/places#place_search_requests
      const map = new window.google.maps.Map(document.createElement("div"));
      const service = new window.google.maps.places.PlacesService(map);

      service.getDetails(
        {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          placeId: databaseData.googlePlaceId ?? "", // `Using itinerary.placeId as string` gives unnecessary type assertion. eslint-disable unsafe any for now
          fields: [
            "name",
            "photos",
            "place_id",
            "rating",
            "types",
            "url",
            "user_ratings_total",
            "vicinity",
            "website",
          ],
        },
        (result, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            if (result) setPlaceResult(result);
            const photos = result?.photos?.map((photo) => {
              return photo.getUrl();
            });
            setImages(photos?.slice(0, 5) ?? []);
          }
        }
      );
    };
    fetchDetails();
  }, [databaseData]);

  console.log("placeResult", placeResult);

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
