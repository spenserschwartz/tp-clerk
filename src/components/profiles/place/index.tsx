import { useEffect, useState } from "react";

import { ImageGallery } from "~/components";
import type { PlaceResult } from "~/types/google";
import { type AttractionByNameType } from "~/types/router";
import { GoogleReviewBadge, PlaceDetails, PlaceTitle } from "./components";

interface PlacesProfileProps {
  databaseData?: AttractionByNameType;
}

const PlacesProfile = ({ databaseData }: PlacesProfileProps) => {
  const [placeResult, setPlaceResult] = useState<PlaceResult | undefined>(
    undefined
  );
  const [images, setImages] = useState<string[]>([]);

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

        {/* <PlaceDetails databaseData={databaseData} googleData={placeResult} /> */}
        <GoogleReviewBadge googleData={placeResult} />
      </div>
    </div>
  );
};

export default PlacesProfile;
