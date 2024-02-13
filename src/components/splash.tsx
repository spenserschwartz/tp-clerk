import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { set } from "date-fns";
import React, { useEffect, useState } from "react";
import { type PlaceResult, type PlacesService } from "~/types/google";
import { api } from "~/utils/api";

const SplashComponent = () => {
  const query = "Big Ben London";
  const placesLib = useMapsLibrary("places");
  const [placesService, setPlacesService] = useState<PlacesService | null>(
    null
  );

  const [placeResult, setPlaceResult] = useState<PlaceResult | null>(null);

  const { data } = api.google.getPlaceDetails.useQuery({
    placeId: "ChIJ2dGMjMMEdkgRqVqkuXQkj7c",
  });

  const { data: newTextData } = api.google.searchByTextNew.useQuery({
    query,
  });

  const { rating, userRatingCount, displayName } = newTextData ?? {};
  const candidatesNew = newTextData?.candidates ?? [{}];

  console.log("newTextData", newTextData);

  const { data: originalData } = api.google.searchByText.useQuery({
    query,
  });

  const candidates = originalData?.candidates ?? [
    { name: "No name", rating: 0, user_ratings_total: 0 },
  ];

  useEffect(() => {
    if (!placesLib) return;

    // Correctly initializing PlacesService with a div element, maybe
    const div = document.createElement("div");
    setPlacesService(new placesLib.PlacesService(div));
  }, [placesLib]);

  useEffect(() => {
    if (!placesService) return;

    const placeId = "ChIJ2dGMjMMEdkgRqVqkuXQkj7c"; // Big Ben
    // const placeId = "ChIJN1t_tDeuEmsRUsoyG83frY4"; // Google Sydney office
    const request = {
      placeId: placeId,
      fields: ["ALL"], // change this and save to sometimes get different results
    };

    // Using the placesService to fetch details
    placesService.getDetails(request, (result, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && result) {
        console.log("placeResult:", result);
        setPlaceResult(result);
      } else {
        console.log("Failed to fetch place details:", status);
      }
    });
  }, [placesService]);

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center border-4 border-red-400">
      <div className="mt-8">placesService</div>
      <div>{placeResult?.name}</div>
      <div>{placeResult?.rating}</div>
      <div>{placeResult?.user_ratings_total}</div>

      <div className="mt-8">NEW</div>
      <div>{candidatesNew[0].name}</div>
      <div>{candidatesNew[0].rating}</div>
      <div>{candidatesNew[0].user_ratings_total}</div>

      <div className="mt-8">searchByText OG</div>
      <div>{candidates[0].name}</div>
      <div>{candidates[0].rating}</div>
      <div>{candidates[0].user_ratings_total}</div>
      <div>{}</div>
    </div>
  );
};

export default SplashComponent;

// Big Ben
// ChIJ2dGMjMMEdkgRqVqkuXQkj7c

// Google given
// ChIJN1t_tDeuEmsRUsoyG83frY4
