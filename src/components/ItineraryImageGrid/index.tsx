import React from "react";
import { type ItineraryWithCityInfoType } from "~/types/router";
import ItineraryGridElement from "./components/GridElement";

interface ItineraryImageGridProps {
  itineraries: ItineraryWithCityInfoType[];
}

const ItineraryImageGrid = ({ itineraries }: ItineraryImageGridProps) => {
  return (
    <ul
      role="list"
      className="mt-4 grid grid-cols-1 place-items-center gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:gap-8 2xl:grid-cols-5 "
    >
      {itineraries?.map((itinerary) => (
        <div key={itinerary.id}>
          <ItineraryGridElement itinerary={itinerary} />
        </div>
      ))}
    </ul>
  );
};

export default ItineraryImageGrid;
