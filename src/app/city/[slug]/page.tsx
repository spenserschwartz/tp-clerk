import React from "react";
import { api } from "~/trpc/server";

import { databaseCitiesSet } from "@/constants";
import type {
  NearbySearchNewResponse,
  PlaceNew,
  PlaceResultWithLatLng,
} from "~/types/google";

interface CityPageProps {
  params: { slug: string };
}

async function getCityDataAndTopPlaces(cityName: string) {
  const apiKey = process.env.GOOGLE_DETAILS_API_KEY ?? "";
  const radius = 50000; // 50km

  if (databaseCitiesSet.has(cityName)) {
    const cityData = await api.city.getCityDataByName({ name: cityName });
    console.log("cityName", cityName);
    console.log("THIS IS CITYDATA", cityData);
    const cityDataPlaceResult: PlaceResultWithLatLng =
      cityData?.placeResult as unknown as PlaceResultWithLatLng;
    const latitude = cityDataPlaceResult?.geometry?.location?.lat;
    const longitude = cityDataPlaceResult?.geometry?.location?.lng;

    let topPlacesFromGoogle: PlaceNew[] = [];
    const response = await fetch(
      `https://places.googleapis.com/v1/places:searchNearby`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask":
            "places.displayName,places.types,places.userRatingCount",
        },
        body: JSON.stringify({
          languageCode: "en",
          rankPreference: "POPULARITY",
          includedTypes: ["tourist_attraction"],
          locationRestriction: {
            circle: {
              center: {
                latitude,
                longitude,
              },
              radius,
            },
          },
        }),
      },
    );
    if (!response.ok) {
      throw new Error(`Error fetching places: ${response.statusText}`);
    }
    await response.json().then((data: NearbySearchNewResponse) => {
      topPlacesFromGoogle = data?.places ?? null;
    });
    return { cityData, topPlacesFromGoogle };
  } else {
    return { cityData: "nothing", topPlacesFromGoogle: "nothing" };
  }
}

const CityPage = async ({ params }: CityPageProps) => {
  const cityData = await api.city.getCityDataByName({ name: "London" });
  //   const cityDataAndTopPlaces = await getCityDataAndTopPlaces(params.slug);

  return (
    <div>
      <p>CityName: {params.slug}</p>
      <div>{JSON.stringify(cityData)}</div>
      {/* <div>{JSON.stringify(cityDataAndTopPlaces)}</div> */}
    </div>
  );
};

export default CityPage;
