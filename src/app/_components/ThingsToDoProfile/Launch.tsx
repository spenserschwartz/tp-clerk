"use client";
import { useUser } from "@clerk/nextjs";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { addDays, formatDate } from "date-fns";
import { useEffect, useState, type FormEvent } from "react";

import { useAIGenerateItinerary, useCreateItinerary } from "~/utils/hooks";

import {
  DatePickerWithRange,
  LoadingSpinner,
  PlacesAutoComplete,
} from "@/components";
import { unknownClerkCity } from "@/constants";
import { HeartIcon } from "@/icons";
import { LoginModal } from "@/modals";
import {
  createAutoCompleteRequestOptions,
  sortWithoutPrefix,
} from "~/lib/utils";

import type { DateRange } from "react-day-picker";
import {
  RequestOptionType,
  type AutocompleteRequest,
  type PlaceResult,
} from "~/types/google";
import type { ParsedAIMessageInterface } from "~/types/openai";
import type { GetAllLikesByUserInCityType } from "~/types/router";

interface ThingsToDoLaunchProps {
  allLikesByUserInCity: GetAllLikesByUserInCityType[];
  placeResult: PlaceResult | undefined;
}

const ThingsToDoLaunch = ({
  allLikesByUserInCity,
  placeResult,
}: ThingsToDoLaunchProps) => {
  const { isSignedIn } = useUser();
  const {
    createItinerary,
    isCreatingItinerary,
    itineraryCreated,
    itineraryData,
  } = useCreateItinerary();
  const { generateAIItinerary, isLoadingAI } = useAIGenerateItinerary();
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 3),
  });
  const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);
  const [includedAttractions, setIncludedAttractions] = useState<string[]>([]);
  const [showLoading, setShowLoading] = useState(false);
  const attractionsLikedByUser: string[] = allLikesByUserInCity.map(
    (el) => el.displayName,
  );

  console.log("alby", attractionsLikedByUser);

  const [requestOptions, setRequestOptions] =
    useState<AutocompleteRequest | null>(null);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the browser from reloading the page

    const formattedStartDate = formatDate(
      date?.from ?? new Date(),
      "yyyy-MM-dd",
    );
    const formattedEndDate = formatDate(date?.to ?? new Date(), "yyyy-MM-dd");

    generateAIItinerary(
      {
        cityName: placeResult?.formatted_address ?? "",
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        attractions: includedAttractions ?? [],
      },
      {
        onSettled(data) {
          //   Create a row in Itinerary table
          if (data) {
            const newParsedData = JSON.parse(
              data?.choices[0]?.message.content ?? "",
            ) as ParsedAIMessageInterface[];

            createItinerary({
              cityName: unknownClerkCity.name,
              cityId: unknownClerkCity.id,
              details: newParsedData,
              title: `${newParsedData.length} days in ${placeResult?.name}`,
            });
          }
        },
      },
    );
  };

  const handleAddLikedAttractions = () => {
    if (!isSignedIn) {
      setOpenLoginModal(true);
      return;
    }

    if (attractionsLikedByUser) {
      setIncludedAttractions((prev) => {
        // Create a new Set from the existing attractions
        const updatedAttractionsSet = new Set(prev);

        // Add only new attractions that aren't already included
        attractionsLikedByUser.forEach((attraction) => {
          attraction ? updatedAttractionsSet.add(attraction) : null;
        });

        // Convert the Set back into an array
        return Array.from(updatedAttractionsSet);
      });
    }
  };

  const handleAddAttraction = (place: PlaceResult | null) => {
    setIncludedAttractions((prev) => [...prev, place?.name ?? ""]);
  };

  const handleRemoveAttraction = (attraction: string) => {
    setIncludedAttractions((prev) => prev.filter((a) => a !== attraction));
  };

  // Set up request options for PlacesAutoComplete
  useEffect(() => {
    if (placeResult?.geometry?.location) {
      const SEARCH_RADIUS = 10000; // 10 kilometers radius

      const lat = placeResult.geometry.location.lat();
      const lng = placeResult.geometry.location.lng();
      const CITY_COORDINATES = { lat, lng };

      setRequestOptions(
        createAutoCompleteRequestOptions(
          RequestOptionType.Establishment,
          "", // Add the user's input here
          CITY_COORDINATES,
          SEARCH_RADIUS,
          google.maps,
        ),
      );
    }
  }, [placeResult?.geometry?.location]);

  return (
    <>
      <div className="flex h-full flex-col items-center">
        <form
          className="w-screen max-w-md flex-auto overflow-visible rounded-3xl bg-white text-sm leading-6 shadow-xl ring-1 ring-gray-900/5"
          onSubmit={handleFormSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleFormSubmit(e);
          }}
        >
          <h2 className="mt-2 text-center text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Make an Itinerary
          </h2>
          {showLoading && (
            <div className="flex justify-center">
              <LoadingSpinner size={100} />
            </div>
          )}

          {!showLoading && (
            <div>
              {/* Date Range Picker */}
              <div className="px-4">
                <span className="font-semibold text-gray-900">
                  Choose your dates
                </span>
                <DatePickerWithRange date={date} setDate={setDate} />
              </div>

              {/* PlacesAutoComplete (custom attractions) */}
              <div className="px-4 py-2">
                <span className="font-semibold text-gray-900">
                  Add an attraction
                </span>
                {requestOptions && (
                  <PlacesAutoComplete
                    requestOptions={requestOptions}
                    setSelected={handleAddAttraction}
                  />
                )}
              </div>

              {/* Included Attractions, alphabetized */}
              <div className="mt-4 flex w-full flex-col px-4">
                <div className="mb-6 block w-full">
                  {/* <SignedIn> */}
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-gray-900">
                      Included Attractions
                    </p>
                    <button
                      className="text-md flex items-center rounded bg-blue-300 px-1  font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                      onClick={handleAddLikedAttractions}
                      type="button"
                    >
                      <span className="mr-1">Add</span>
                      <HeartIcon enabled />
                    </button>
                  </div>

                  {/* List of included attractions */}
                  <ul
                    className={`h-40 w-full overflow-y-auto rounded-md  ${
                      includedAttractions.length > 0
                        ? "border border-gray-300"
                        : null
                    }`}
                  >
                    {includedAttractions?.length === 0 && (
                      <p className=" text-red-800">
                        **Please add attractions to your itinerary
                      </p>
                    )}

                    {sortWithoutPrefix(includedAttractions).map(
                      (attraction) => {
                        return (
                          <li
                            key={attraction}
                            className="group relative flex items-center pl-1 hover:rounded hover:bg-gray-100"
                          >
                            {attraction}
                            <span
                              onClick={() => handleRemoveAttraction(attraction)}
                              className="absolute right-0 cursor-pointer group-hover:inline sm:hidden"
                            >
                              <XMarkIcon className="h-5 w-5 text-red-800" />
                            </span>
                          </li>
                        );
                      },
                    )}
                  </ul>
                  {/* </SignedIn> */}
                </div>
              </div>
            </div>
          )}
        </form>

        {/* Login Modal */}
        <LoginModal
          openModal={openLoginModal}
          setOpenModal={setOpenLoginModal}
        />
      </div>
    </>
  );
};

export default ThingsToDoLaunch;
