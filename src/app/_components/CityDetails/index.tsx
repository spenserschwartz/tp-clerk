"use client";
import { useUser } from "@clerk/nextjs";
import { APIProvider as GoogleAPIProvider } from "@vis.gl/react-google-maps";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { CityLaunch, ImageGrid, LoadingPage, Searchbar } from "@/components";
import { AddIcon } from "@/icons";
import { LoginModal, VisitedCityModal } from "@/modals";
import { getAverageDaysFromCityRecs } from "~/lib/utils";
import type {
  GetCityDataByNameType,
  GetRecommendedDaysByCityType,
  GetUpvotesByUserInCityType,
} from "~/types/router";

interface CityDetailsProps {
  allCityRecs: GetRecommendedDaysByCityType;
  cityData: GetCityDataByNameType;
  userUpvoteData: GetUpvotesByUserInCityType;
}

const CityDetails = ({
  allCityRecs,
  cityData,
  userUpvoteData,
}: CityDetailsProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isSignedIn, user } = useUser();
  const [showCityLaunch, setShowCityLaunch] = useState(false);
  const [openVisitedCityModal, setOpenVisitedCityModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [filterInputValue, setFilterInputValue] = useState("");
  const [isMutating, setIsMutating] = useState(false); // keep track of whether we're mutating data
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const averageRecDays = getAverageDaysFromCityRecs(allCityRecs);

  const visitedCityHandler = () => {
    isSignedIn ? setOpenVisitedCityModal(true) : setOpenLoginModal(true);
  };

  // Close cityLaunch when route changes
  useEffect(() => {
    setShowCityLaunch(false);
  }, [pathname, searchParams]);

  if (!cityData) return null;
  if (!apiKey) return <LoadingPage />;
  return (
    <GoogleAPIProvider apiKey={apiKey}>
      <div className="flex w-full flex-col items-center">
        {/* Details */}
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
            userUpvoteData={userUpvoteData}
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

export default CityDetails;
