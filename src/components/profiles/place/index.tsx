import { useEffect, useState } from "react";
import { api } from "~/utils/api";

import { ImageGallery } from "~/components";
import { slugToDatabaseName } from "~/lib/utils";
import type { PlaceResult } from "~/types/google";
import { AttractionByNameType } from "~/types/router";
import { PlaceTitle } from "./components";

interface PlacesProfileProps {
  placeName: string;
  databaseData?: AttractionByNameType;
}

const PlacesProfile = ({ placeName, databaseData }: PlacesProfileProps) => {
  const [hasUserUpvoted, setHasUserUpvoted] = useState(false);

  console.log("profileData", databaseData);

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
          ],
        },
        (result, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            const placeResult: PlaceResult | null = result;
            const photos = placeResult?.photos?.map((photo) => {
              return photo.getUrl();
            });
            setImages(photos?.slice(0, 5) ?? []);
          }
        }
      );
    };

    fetchDetails();
  }, [databaseData]);

  console.log("database data", databaseData);

  if (!databaseData) return null;

  return (
    // <div className="flex flex-grow flex-col items-center border border-red-400">
    <div className="flex w-full flex-grow justify-center">
      {/* <div className="flex min-w-[400px] max-w-4xl flex-grow flex-col items-center border border-purple-500"> */}
      <div className="flex w-full flex-grow flex-col items-center">
        <PlaceTitle data={databaseData} />

        <ImageGallery images={images} />
      </div>
    </div>
  );
};

export default PlacesProfile;
