import { currentUser } from "@clerk/nextjs";
import type { Metadata } from "next";
import { api } from "~/trpc/server";

import { CityDetails } from "@/components";
import { databaseCitiesSet, unknownClerkCity } from "@/constants";
import { convertSlugToDatabaseName } from "~/lib/utils";
import type {
  NearbySearchNewResponse,
  PlaceNew,
  PlaceResultWithLatLng,
} from "~/types/google";

interface CityPageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: CityPageProps): Promise<Metadata> {
  const slug = params.slug;
  const cityName = convertSlugToDatabaseName(slug);

  return { title: `${cityName} - TravelPerfect` };
}

// Only set up for cities right now in the database i.e. London & Berlin
async function getCityDataAndTopPlaces(slug: string) {
  const apiKey = process.env.GOOGLE_DETAILS_API_KEY ?? "";
  const radius = 50000; // 50km

  const cityName: string = convertSlugToDatabaseName(slug);

  if (databaseCitiesSet.has(cityName)) {
    const cityData = await api.city.getCityDataByName({ name: cityName });
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
    return { cityData: null, topPlacesFromGoogle: null };
  }
}

async function getUserUpvoteDataInCity(
  cityId: string | undefined,
  userId: string | undefined,
) {
  if (!cityId || !userId) return [];
  const userUpvotesInCity = await api.upvotes.getAllByUserInCity({
    cityId,
    userId,
  });
  return userUpvotesInCity;
}

async function getRecommendedDaysInCity(slug: string) {
  const cityName: string = convertSlugToDatabaseName(slug);
  const allCityRecs = await api.recommendedDaysInCity.getAllByCity({
    cityName,
  });
  return allCityRecs;
}

const CityPage = async ({ params }: CityPageProps) => {
  const user = await currentUser();

  const cityDataAndTopPlaces = await getCityDataAndTopPlaces(params.slug);
  const { cityData, topPlacesFromGoogle } = cityDataAndTopPlaces;

  const userUpvoteData = await getUserUpvoteDataInCity(cityData?.id, user?.id);

  const allCityRecs = await getRecommendedDaysInCity(params.slug);

  if (!cityData) return <div>404 City Not Found</div>;
  return (
    // <div>
    //   <p>CityName: {params.slug}</p>
    //   {/* <div>{JSON.stringify(cityData)}</div> */}
    //   <div>{JSON.stringify(cityDataAndTopPlaces)}</div>
    // </div>

    <CityDetails
      allCityRecs={allCityRecs}
      cityData={cityData}
      userUpvoteData={userUpvoteData}
    />
  );
};

export default CityPage;
