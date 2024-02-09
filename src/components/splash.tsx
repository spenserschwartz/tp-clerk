import { useMapsLibrary } from "@vis.gl/react-google-maps";
import React, { useEffect, useState } from "react";
import { type PlacesService } from "~/types/google";

const SplashComponent = () => {
  const placesLib = useMapsLibrary("places");
  const [sessionToken, setSessionToken] =
    useState<google.maps.places.AutocompleteSessionToken>();
  const [placesService, setPlacesService] = useState<PlacesService | null>(
    null
  );

  useEffect(() => {
    if (!placesLib) return;

    // Correctly initializing PlacesService with a div element, maybe
    const div = document.createElement("div");
    setPlacesService(new placesLib.PlacesService(div));

    setSessionToken(new placesLib.AutocompleteSessionToken());
  }, [placesLib]);

  useEffect(() => {
    if (!placesService) return;

    // const placeId = "ChIJ2dGMjMMEdkgRqVqkuXQkj7c"; // Big Ben
    const placeId = "ChIJN1t_tDeuEmsRUsoyG83frY4"; // Google Sydney office
    const request = {
      placeId: placeId,
      fields: ["ALL"], // change this and save to sometimes get different results
      sessionToken,
    };

    // Using the placesService to fetch details
    placesService.getDetails(request, (result, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && result) {
        console.log("Place details:", result);
      } else {
        console.log("Failed to fetch place details:", status);
      }
    });
  }, [placesService, sessionToken]);

  return <div>SplashComponent</div>;
};

export default SplashComponent;

// Big Ben
// ChIJ2dGMjMMEdkgRqVqkuXQkj7c

// Google given
// ChIJN1t_tDeuEmsRUsoyG83frY4
