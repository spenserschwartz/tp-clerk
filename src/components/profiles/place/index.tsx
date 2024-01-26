import { useEffect, useState } from "react";
import { api } from "~/utils/api";

import ImageGallery from "~/components/ImageGallery";
import { slugToDatabaseName } from "~/lib/utils";
import type { PlaceResult } from "~/types/google";

interface PlacesProfileProps {
  placeName: string;
}

const PlacesProfile = ({ placeName }: PlacesProfileProps) => {
  const { data: databaseData } = api.attractions.getByName.useQuery({
    name: slugToDatabaseName(placeName),
  });
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
            // const customCityPhotoURL =
            //   placeResult?.photos?.[0]?.getUrl() ?? undefined;

            console.log("placeResult", placeResult);

            const photos = placeResult?.photos?.map((photo) => {
              return photo.getUrl();
            });

            console.log("photos", photos);
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
    <div className="flex justify-center">
      <ImageGallery images={images} />
    </div>
  );
};

export default PlacesProfile;

// return (
//   <div>
//     <div className="container mx-auto p-4">
//       <div className="grid grid-cols-4 grid-rows-2 gap-4">
//         {/* Large image */}
//         <div className="col-span-2 row-span-2">
//           <img
//             src={images[0]}
//             alt="Large Gallery Image"
//             className="aspect-square relative h-full w-full object-cover"
//           />
//         </div>

//         {/* Small images */}
// {images.slice(1).map((image, index) => (
//   <div key={index} className="col-span-1 row-span-1">
//     <img
//       src={image}
//       alt={`Gallery Image ${index + 2}`}
//       className="aspect-square relative h-full w-full object-cover"
//     />
//   </div>
// ))}
//       </div>
//     </div>
//   </div>
// );
