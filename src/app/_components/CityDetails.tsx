"use client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { LoadingPage } from "@/components";
import { AddIcon } from "@/icons";
import type { GetCityDataByNameType } from "~/types/router";

interface CityDetailsProps {
  cityData: GetCityDataByNameType;
}

const CityDetails = ({ cityData }: CityDetailsProps) => {
  const router = useRouter();
  const { isSignedIn, user } = useUser();
  const [showCityLaunch, setShowCityLaunch] = useState(false);
  const [openVisitedCityModal, setOpenVisitedCityModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [filterInputValue, setFilterInputValue] = useState("");
  const [isMutating, setIsMutating] = useState(false); // keep track of whether we're mutating data
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!cityData) return null;
  if (!apiKey) return <LoadingPage />;
  return (
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
    </div>
  );
};

export default CityDetails;
