import { useUser } from "@clerk/nextjs";
import { APIProvider as GoogleAPIProvider } from "@vis.gl/react-google-maps";
import type { GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState, type ReactElement } from "react";
import { api } from "~/utils/api";

import AddIcon from "public/icons/add";
import { CityLaunch, ImageGrid, LoadingPage, Searchbar } from "~/components";
import VisitedCityModal from "~/components/forms/VisitedCity";
import { RootLayout } from "~/components/layout";
import LoginModal from "~/components/modal/Login";
import { unknownClerkCity } from "~/components/utils";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import type {
  NearbySearchNewResponse,
  Place,
  PlaceResultWithLatLng,
} from "~/types/google";
import { type NextPageWithLayout } from "~/types/pages";
import { findAverageRecDays } from "~/utils/common";
import { databaseCitiesSet } from "~/utils/constants";

interface CityPageStaticProps {
  cityName: string;
  topPlacesFromGoogle: Place[];
  textQuery?: string;
}

const CityPage: NextPageWithLayout<CityPageStaticProps> = (props) => {
  const router = useRouter();
  const { isSignedIn, user } = useUser();
  const [showCityLaunch, setShowCityLaunch] = useState(false);
  const [openVisitedCityModal, setOpenVisitedCityModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [filterInputValue, setFilterInputValue] = useState("");
  const [isMutating, setIsMutating] = useState(false); // keep track of whether we're mutating data
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const { cityName, textQuery } = props;

  const { data: cityData } = api.city.getCityDataByName.useQuery({
    name: cityName,
  });

  const { data: userUpvoteData } = api.upvotes.getAllByUserInCity.useQuery({
    cityId: cityData?.id ?? unknownClerkCity.id,
    userId: user ? user.id : "",
  });
  const { data: allCityRecs } = api.recommendedDaysInCity.getAllByCity.useQuery(
    {
      cityName: cityData?.name ?? unknownClerkCity.name,
    }
  );

  console.log("CityPage props", props);

  const { data: findPlaceData } = api.google.findPlace.useQuery(
    {
      query: textQuery ?? "",
    },
    { refetchOnMount: false, refetchOnWindowFocus: false }
  );

  console.log("findPlaceData", findPlaceData);

  const averageRecDays = findAverageRecDays(allCityRecs);

  const visitedCityHandler = () => {
    isSignedIn ? setOpenVisitedCityModal(true) : setOpenLoginModal(true);
  };

  // Close cityLaunch when route changes
  useEffect(() => {
    // Set setShowCityLaunch to false when the route changes
    const handleRouteChange = () => {
      setShowCityLaunch(false);
    };

    // Add an event listener for route changes
    router.events.on("routeChangeStart", handleRouteChange);

    // Clean up the event listener when the component unmounts
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  });

  if (!cityData) return <div>404 City Not Found</div>;
  if (!apiKey) return <LoadingPage />;
  return (
    <GoogleAPIProvider apiKey={apiKey}>
      <div className="flex w-full flex-col items-center">
        <Head>
          <title>{`${cityData.name} - TravelPerfect`}</title>
        </Head>

        {/* City Details */}
        <div className="flex w-full max-w-6xl flex-col justify-center px-5">
          <div className="relative flex w-full items-center justify-center">
            {/* City Name */}
            <h1 className="my-4 text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
              {cityData.name}
            </h1>

            {/* Show CityLaunch component */}
            <button
              className="absolute right-0"
              onClick={() => setShowCityLaunch(true)}
            >
              <AddIcon />
            </button>
          </div>

          {/* City Description */}
          <p className="mb-2 text-center text-lg font-normal text-gray-500 dark:text-gray-400 sm:px-16 lg:text-xl xl:px-48">
            {cityData.description}
          </p>
        </div>

        {/* Recommended time in city */}
        <p className="text-center text-amber-600">
          {allCityRecs?.length
            ? `Travelers recommend spending ${averageRecDays} in ${cityData.name}`
            : "No recommendations yet"}
        </p>

        {/* Been to this city? Open modal */}
        <div className="flex justify-center">
          <p
            className="text-center text-blue-500 hover:cursor-pointer"
            onClick={visitedCityHandler}
          >{`Been to ${cityData.name}? Click here!`}</p>
        </div>

        {/* CityLaunch */}
        {showCityLaunch && (
          <CityLaunch
            cityData={cityData}
            setShowCityLaunch={setShowCityLaunch}
            isMutating={isMutating}
          />
        )}

        {!showCityLaunch && (
          <div>
            {/* Filter attraction name */}
            <div className="flex w-full justify-center ">
              <Searchbar
                inputValue={filterInputValue}
                setInputValue={setFilterInputValue}
              />
            </div>
            <ImageGrid
              cityData={cityData}
              userUpvoteData={userUpvoteData}
              filterInputValue={filterInputValue}
              setIsMutating={setIsMutating}
            />
          </div>
        )}

        {/* Modals */}
        <LoginModal
          openModal={openLoginModal}
          setOpenModal={setOpenLoginModal}
        />
        <VisitedCityModal
          cityData={cityData}
          openModal={openVisitedCityModal}
          setOpenModal={setOpenVisitedCityModal}
        />
      </div>
    </GoogleAPIProvider>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();
  const slug = context.params?.slug;
  if (typeof slug !== "string") throw new Error("no slug");
  const cityName: string = slug.replace("@", "");

  // Conditionally prefetch if the city is in the database
  if (databaseCitiesSet.has(cityName)) {
    await ssg.city.getCityDataByName.prefetch({ name: cityName });

    // Get cityData via SSR to pass to the client
    const cityData = await ssg.city.getCityDataByName.fetch({ name: cityName });
    const cityDataPlaceResult: PlaceResultWithLatLng =
      cityData?.placeResult as unknown as PlaceResultWithLatLng;
    const latitude = cityDataPlaceResult?.geometry?.location?.lat;
    const longitude = cityDataPlaceResult?.geometry?.location?.lng;

    // Get most popular/prominent places in the city
    let topPlacesFromGoogle: Place[] = [];
    try {
      const apiKey = process.env.GOOGLE_DETAILS_API_KEY ?? "";
      const radius = 50000; // 10km

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
        }
      );

      if (!response.ok) {
        throw new Error(`Error fetching places: ${response.statusText}`);
      }
      await response.json().then((data: NearbySearchNewResponse) => {
        topPlacesFromGoogle = data?.places ?? null;
      });
    } catch (err) {
      console.log("error", err);
    }

    return {
      props: {
        trpcState: ssg.dehydrate(),
        cityName,
        topPlacesFromGoogle,
      },
    };
  } else {
    await ssg.google.findPlace.prefetch({ query: "Taco Bell Venice Blvd" });

    return {
      props: {
        trpcState: ssg.dehydrate(),
        cityName: "Los Angeles",
        textQuery: "Taco Bell Venice Blvd",
      },
    };
  }
};

export const getStaticPaths = () => {
  const paths = [
    { params: { slug: "london" } },
    { params: { slug: "berlin" } },
  ];

  return { paths, fallback: "blocking" };
};

CityPage.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default CityPage;
