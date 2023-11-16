import React from "react";
import { type ItineraryWithCityInfoType } from "~/types/router";

interface ItineraryImageGridProps {
  itineraries: ItineraryWithCityInfoType[];
}

const ItineraryImageGrid = ({ itineraries }: ItineraryImageGridProps) => {
  console.log("itineraries", itineraries);

  return <div>ItineraryImageGrid</div>;
};

export default ItineraryImageGrid;
