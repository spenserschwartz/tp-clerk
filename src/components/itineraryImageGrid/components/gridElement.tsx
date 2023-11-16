import Image from "next/image";
import React from "react";
import { ParsedAIMessageInterface } from "~/types";

import { type ItineraryWithCityInfoType } from "~/types/router";

interface ItineraryGridElementProps {
  itinerary: ItineraryWithCityInfoType;
}

const ItineraryGridElement = ({ itinerary }: ItineraryGridElementProps) => {
  const details = itinerary.details as unknown as ParsedAIMessageInterface[];
  const { length: numberOfDays } = details;

  console.log("numberOfDays", numberOfDays);

  return (
    <div
      className="max-w-sm overflow-hidden rounded shadow-lg"
      data-aos="fade-up"
    >
      {/* Image */}
      <div className="group aspect-h-7 aspect-w-10 relative block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
        <Image
          src={"/images/placeholder.png"}
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
          Itinerary name here
        </div>

        {/* Description */}
        <div>
          <p className="line-clamp-3 h-20  py-2 text-base text-gray-700">
            Itinerary description here
          </p>
        </div>
      </div>

      {/* Tags */}
      <div className="px-6 pb-2 pt-4">
        <span className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
          #travel
        </span>
        <span className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
          #attraction
        </span>
        <span className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
          #itinerary
        </span>
      </div>
    </div>
  );
};

export default ItineraryGridElement;
