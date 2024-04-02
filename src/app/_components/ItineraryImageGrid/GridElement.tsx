"use client";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { DropdownMenu } from "@/components";
import { FadeUpWrapper } from "@/framer-motion";
import { unknownClerkCity } from "~/lib/constants";
import type { PlaceResult, PlacesService } from "~/types/google";
import type { ParsedAIMessageInterface } from "~/types/openai";
import type { ItineraryWithCityInfoType } from "~/types/router";

interface ItineraryGridElementProps {
  itinerary: ItineraryWithCityInfoType;
}

const ItineraryImageGridElement = ({
  itinerary,
}: ItineraryGridElementProps) => {
  const router = useRouter();
  const placesLib = useMapsLibrary("places");
  const [placesService, setPlacesService] = useState<PlacesService | null>(
    null,
  );
  const [customImageURL, setCustomImageURL] = useState<string | undefined>(
    undefined,
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

  // Correctly initializing PlacesService with a div element
  useEffect(() => {
    if (!placesLib) return;
    const map = new google.maps.Map(document.createElement("div"));
    setPlacesService(new placesLib.PlacesService(map));
  }, [placesLib]);

  // Fetch details from Google Places API for customCity photo
  useEffect(() => {
    if (!placesService || !itinerary.placeId || !isCustomCity) return;
    const request = {
      placeId: itinerary.placeId,
      fields: ["photos"],
    };

    placesService.getDetails(request, (result, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && result) {
        const placeResult: PlaceResult | null = result;
        const customCityPhotoURL =
          placeResult?.photos?.[0]?.getUrl() ?? undefined;

        setCustomImageURL(customCityPhotoURL);
      } else {
        console.log("Failed to fetch place details for custom city:", status);
      }
    });
  }, [itinerary.placeId, placesService, isCustomCity]);

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

export default ItineraryImageGridElement;
