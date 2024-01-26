import { useEffect } from "react";
import { api } from "~/utils/api";

import { slugToDatabaseName } from "~/lib/utils";
import type { PlaceResult } from "~/types/google";

interface PlacesProfileProps {
  placeName: string;
}

const PlacesProfile = ({ placeName }: PlacesProfileProps) => {
  const { data: databaseData } = api.attractions.getByName.useQuery({
    name: slugToDatabaseName(placeName),
  });

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
            // Do something with the result object here
            const placeResult: PlaceResult | null = result;
            // const customCityPhotoURL =
            //   placeResult?.photos?.[0]?.getUrl() ?? undefined;

            console.log("placeResult", placeResult);
          }
        }
      );
    };
    fetchDetails();
  }, [databaseData]);

  console.log("database data", databaseData);

  return <div>PlacesPageProfile</div>;
};

export default PlacesProfile;
