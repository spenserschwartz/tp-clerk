import { Wrapper as GoogleMapsWrapper } from "@googlemaps/react-wrapper";

import { type ItineraryWithCityInfoType } from "~/types/router";
import { googleMapsRender } from "~/utils/google";
import ItineraryGridElement from "./components/GridElement";

interface ItineraryImageGridProps {
  itineraries: ItineraryWithCityInfoType[];
}

const ItineraryImageGrid = ({ itineraries }: ItineraryImageGridProps) => {
  return (
    <GoogleMapsWrapper
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ""}
      render={googleMapsRender}
      libraries={["places"]}
    >
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
    </GoogleMapsWrapper>
  );
};

export default ItineraryImageGrid;
