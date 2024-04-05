"use client";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import React, { useEffect } from "react";
import { api } from "~/trpc/react";

const SplashPage = () => {
  const map = useMap();
  const placesLib = useMapsLibrary("places");
  const { data: databaseData } = api.attractions.getByName.useQuery({
    name: "Tower of London",
  });

  const { data: googleData } = api.google.getPlaceDetails.useQuery({
    placeId: databaseData?.googlePlaceId ?? "",
  });

  console.log("databaseData:", databaseData);
  console.log("googleData:", googleData);

  // useEffect(() => {
  //   console.log("ue placesLib", placesLib);
  //   console.log("ue databaseData", databaseData);
  //   if (!placesLib || !databaseData) return;

  //   const svc = new placesLib.PlacesService(document.createElement("div"));
  //   const request = {
  //     placeId: databaseData.googlePlaceId ?? "",
  //     fields: [
  //       "name",
  //       "rating",
  //       "formatted_phone_number",
  //       "geometry",
  //       "user_ratings_total",
  //       "url",
  //       "website",
  //       "photos",
  //       "vicinity",
  //     ],
  //   };

  //   svc.getDetails(request, (result, status) => {
  //     console.log("svc.getDetails");
  //     if (status === google.maps.places.PlacesServiceStatus.OK && result) {
  //       // setPlaceResult(result);
  //       const photos = result?.photos?.map((photo) => {
  //         return photo.getUrl();
  //       });
  //       console.log("Splash photos", photos);
  //       // setImages(photos?.slice(0, 5) ?? []);
  //     } else {
  //       console.log("Failed to fetch place details:", status);
  //     }
  //   });
  // }, [placesLib, databaseData]);

  return <div>Splash</div>;
};

export default SplashPage;

// Tower of London GoogleId
// ChIJ3TgfM0kDdkgRZ2TV4d1Jv6g
