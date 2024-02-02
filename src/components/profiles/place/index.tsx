import { useEffect, useState } from "react";
import { api } from "~/utils/api";

import { ImageGallery } from "~/components";
import type { PlaceResult } from "~/types/google";
import { type AttractionByNameType } from "~/types/router";
import { type LocationDetails } from "~/types/tripAdvisor";
import {
  GoogleReviewBadge,
  PlaceDetails,
  PlaceReviews,
  PlaceTitle,
} from "./components";

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
  const { tripAdvisorLocationId } = databaseData ?? {};
  const [images, setImages] = useState<string[]>([]);

  // const { details } = useGetTripAdvisorDetails("211709");

  const { data: fetchedTripAdvisorData, error: tripAdvisorError } =
    api.tripAdvisor.getLocationDetails.useQuery(
      { locationId: tripAdvisorLocationId ?? "" },
      {
        enabled: !!databaseData,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
      }
    );

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

      const map = new window.google.maps.Map(document.createElement("div"));
      const service = new window.google.maps.places.PlacesService(map);

      service.getDetails(
        {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          placeId: databaseData.googlePlaceId ?? "", // `Using itinerary.placeId as string` gives unnecessary type assertion. eslint-disable unsafe any for now
          fields: [
            "name",
            "formatted_address",
            "geometry",
            "photo",
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

  if (!databaseData) return null;
  return (
    <div className="flex w-full flex-grow justify-center">
      <div className="flex w-full flex-grow flex-col items-center">
        <PlaceTitle data={databaseData} />

        <ImageGallery images={images} />

        <PlaceDetails
          databaseData={databaseData}
          googleData={placeResult}
          tripAdvisorData={tripAdvisorData}
        />

        {/* <GoogleReviewBadge googleData={placeResult} /> */}
        <PlaceReviews />
      </div>
    </div>
  );
};

export default PlacesProfile;
