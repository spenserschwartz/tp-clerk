import Image from "next/image";
import { useRouter } from "next/router";

import DropdownMenu from "~/components/dropdownMenu";
import type { ParsedAIMessageInterface } from "~/types";
import type { ItineraryWithCityInfoType } from "~/types/router";

interface ItineraryGridElementProps {
  itinerary: ItineraryWithCityInfoType;
}

const ItineraryGridElement = ({ itinerary }: ItineraryGridElementProps) => {
  const router = useRouter();
  const details = itinerary.details as unknown as ParsedAIMessageInterface[];
  const {
    city: { name: cityName, imageURL: cityImageURL },
  } = itinerary;
  const { length: numberOfDays } = details;

  const itineraryName = `${numberOfDays} days in ${cityName}`;
  const itineraryDescription = details[0]?.afternoon;

  const gridElementClickHandler = () => {
    void router.push(`/itinerary/${itinerary.id}`);
  };

  return (
    <div
      className="max-w-sm overflow-hidden rounded shadow-lg"
      data-aos="fade-up"
    >
      {/* Image & pencil icon*/}
      <div
        className="group aspect-h-7 aspect-w-10 relative block w-full cursor-pointer overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100"
        onClick={gridElementClickHandler}
      >
        {/* Pencil icon in top right of image */}
        <div
          className="absolute bottom-auto left-auto z-10 h-auto w-auto p-2"
          onClick={(e) => e.stopPropagation()} // prevents gridElementClickHandler from being called
        >
          <DropdownMenu itineraryID={itinerary.id} />
        </div>

        {/* Image */}
        <Image
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          src={cityImageURL ?? "/images/placeholder.png"}
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
            {itineraryName}
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
          #travel
        </span>
        <span className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
          {`#${cityName}`}
        </span>
        <span className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
          #itinerary
        </span>
      </div>
    </div>
  );
};

export default ItineraryGridElement;
