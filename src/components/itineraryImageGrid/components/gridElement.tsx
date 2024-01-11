import { useLoadScript, type Libraries } from "@react-google-maps/api";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import DropdownMenu from "~/components/dropdownMenu";
import { FadeUpWrapper } from "~/components/framer-motion";
import { unknownClerkCity } from "~/components/utils";
import type { ParsedAIMessageInterface } from "~/types";
import { type PlaceResult } from "~/types/google";
import type { ItineraryWithCityInfoType } from "~/types/router";

interface ItineraryGridElementProps {
  itinerary: ItineraryWithCityInfoType;
}

const libraries: Libraries = ["places"];

const ItineraryGridElement = ({ itinerary }: ItineraryGridElementProps) => {
  const router = useRouter();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
    libraries,
  });
  const [customImageURL, setCustomImageURL] = useState<string | undefined>(
    undefined
  );

  const details = itinerary.details as unknown as ParsedAIMessageInterface[];
  const itineraryTitle = itinerary.title;
  const isCustomCity = itinerary.cityId === unknownClerkCity.id;

  const {
    city: { name: cityName, imageURL: cityImageURL },
  } = itinerary;
  const { length: numberOfDays } = details;
  const itineraryUserId = itinerary.userId ?? "";

  const itineraryName = `${numberOfDays} days in ${cityName}`;
  const itineraryDescription = details[0]?.afternoon;

  const gridElementClickHandler = () => {
    void router.push(`/itinerary/${itinerary.id}`);
  };

  useEffect(() => {
    const fetchDetails = () => {
      if (!itinerary.placeId) return;

      const map = new window.google.maps.Map(document.createElement("div"));
      const service = new window.google.maps.places.PlacesService(map);

      service.getDetails(
        {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          placeId: itinerary.placeId, // `Using itinerary.placeId as string` gives unnecessary type assertion. eslint-disable unsafe any for now
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
            console.log("placeResult", placeResult);
            console.log(
              "placeResult lat",
              placeResult?.geometry?.location?.lat()
            );

            const customCityPhotoURL =
              placeResult?.photos?.[0]?.getUrl() ?? undefined;

            setCustomImageURL(customCityPhotoURL);
          }
        }
      );
    };

    if (isCustomCity && isLoaded) fetchDetails();
  }, [isCustomCity, isLoaded, itinerary.placeId]);

  return (
    <FadeUpWrapper>
      <div className="max-w-sm overflow-hidden rounded shadow-lg">
        {/* Image & pencil icon*/}
        <div
          className="group aspect-h-7 aspect-w-10 relative block w-full cursor-pointer overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100"
          onClick={gridElementClickHandler}
        >
          {/* Pencil icon in top right of image */}
          <div
            className="absolute bottom-auto left-auto z-10 h-auto w-auto p-2"
            onClick={(e) => e.stopPropagation()} // prevents gridElementClickHandler in parent from being called
          >
            <DropdownMenu
              itineraryID={itinerary.id}
              itineraryUserID={itineraryUserId}
            />
          </div>

          {/* Image */}
          <Image
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            src={
              isCustomCity
                ? customImageURL ?? "/images/placeholder.png"
                : cityImageURL ?? "/images/placeholder.png"
            }
            // src={itineraryImageURL ?? cityImageURL ?? "/images/placeholder.png"}

            alt=""
            className="pointer-events-none object-cover"
            width={100}
            height={100}
            priority
            unoptimized
          />
        </div>

        {/* Details */}
        <div className="px-4 py-2">
          {/* Itinerary Name */}
          <div className="flex h-14 items-center justify-center text-center text-xl font-bold">
            <p
              className="cursor-pointer hover:opacity-75"
              onClick={gridElementClickHandler}
            >
              {itineraryTitle ?? itineraryName}
            </p>
          </div>

          {/* Description */}
          <div>
            <p className="line-clamp-3 h-20  py-2 text-base text-gray-700">
              {itineraryDescription}
            </p>
          </div>
        </div>

        {/* Tags */}
        <div className="px-6 pb-2 pt-4">
          <span className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
            {`#${cityName}`}
          </span>
          <span className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
            #itinerary
          </span>
        </div>
      </div>
    </FadeUpWrapper>
  );
};

export default ItineraryGridElement;
