"use client";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import Image from "next/image";
import { useEffect, useState } from "react";

import { ThingsToDoLaunch } from "@/components";
import type { PlaceResult, PlacesService } from "~/types/google";
import type { GetAllLikesByUserInCityType } from "~/types/router";

interface ThingsToDoDetailsProps {
  allLikesByUserInCity: GetAllLikesByUserInCityType[];
  googleCityName: string;
}

const ThingsToDoDetails = ({
  allLikesByUserInCity,
  googleCityName,
}: ThingsToDoDetailsProps) => {
  const placesLib = useMapsLibrary("places");
  const [placeResult, setPlaceResult] = useState<PlaceResult | undefined>(
    undefined,
  );
  const [placesService, setPlacesService] = useState<PlacesService | null>(
    null,
  );
  const [images, setImages] = useState<string[]>([]);
  const [showCityLaunch, setShowCityLaunch] = useState(false);

  // Correctly initializing PlacesService with a div element
  useEffect(() => {
    if (!placesLib) return;
    const map = new google.maps.Map(document.createElement("div"));
    setPlacesService(new placesLib.PlacesService(map));
  }, [placesLib]);

  // Fetch details from Google Places API
  useEffect(() => {
    if (!placesService || !googleCityName) return;

    placesService.textSearch({ query: googleCityName }, (result, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && result) {
        console.log("textSearch result", result);
        setPlaceResult(result[0]);
        const photos = result[0]?.photos?.map((photo) => {
          return photo.getUrl();
        });
        setImages(photos?.slice(0, 5) ?? []);
      } else {
        console.log("Failed to fetch place details:", status);
      }
    });
  }, [placesService, googleCityName]);

  return (
    <div className="mt-4 flex w-full justify-between border-2 border-red-400 ">
      <Image
        src={images[0] ?? "/images/placeholder.png"}
        alt="Alt is required by Next Image"
        width={300}
        height={300}
        style={{ width: "auto" }}
      />

      <ThingsToDoLaunch
        allLikesByUserInCity={allLikesByUserInCity}
        placeResult={placeResult}
      />
    </div>
  );
};

export default ThingsToDoDetails;
