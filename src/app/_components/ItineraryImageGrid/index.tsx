"use client";
import { ItineraryImageGridElement, LoadingPage } from "@/components";
import { APIProvider as GoogleAPIProvider } from "@vis.gl/react-google-maps";
import { type ItineraryWithCityInfoType } from "~/types/router";

interface ItineraryImageGridProps {
  itineraries: ItineraryWithCityInfoType[];
}

const ItineraryImageGrid = ({ itineraries }: ItineraryImageGridProps) => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) return <LoadingPage />;
  return (
    <GoogleAPIProvider apiKey={apiKey}>
      <ul
        role="list"
        className="mt-4 grid grid-cols-1 place-items-center gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:gap-8 2xl:grid-cols-5 "
      >
        {itineraries?.map((itinerary) => (
          <div key={itinerary.id}>
            <ItineraryImageGridElement itinerary={itinerary} />
          </div>
        ))}
      </ul>
    </GoogleAPIProvider>
  );
};

export default ItineraryImageGrid;
