import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { Wrapper as GoogleMapsWrapper } from "@googlemaps/react-wrapper";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { addDays, format as formatDate } from "date-fns";
import React, { useEffect, useState } from "react";
import { type DateRange } from "react-day-picker";
import { api } from "~/utils/api";

import { HeartIcon } from "public/icons";

import { LoadingSpinner, PlacesAutoComplete } from "~/components";
import { type ParsedAIMessageInterface } from "~/types";
import {
  RequestOptionType,
  type AutocompleteRequest,
  type PlaceResult,
  type PlaceResultWithLatLng,
} from "~/types/google";
import { type GetCityByNameType } from "~/types/router";
import { DatePickerWithRange } from "~/ui/datePickerWithRange";
import { createRequestOptions, sortWithoutPrefix } from "~/utils/common";
import { useAIGenerateItinerary, useCreateItinerary } from "~/utils/hooks";

interface CityLaunchProps {
  cityData: GetCityByNameType;
  isMutating: boolean;
  setShowCityLaunch: React.Dispatch<React.SetStateAction<boolean>>;
}

const CityLaunch = ({
  cityData,
  isMutating,
  setShowCityLaunch,
}: CityLaunchProps) => {
  const { user } = useUser();
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
  const [showLoading, setShowLoading] = useState(false);
  const { data: userUpvoteData } = api.upvotes.getAllByUserInCity.useQuery({
    cityId: cityData?.id ?? "",
    userId: user ? user.id : "",
  });
  const [includedAttractions, setIncludedAttractions] = useState<string[]>([]);
  const attractionsUpvotedByUser: string[] | undefined = userUpvoteData?.map(
    (upvote) => upvote.attraction.name
  );
  const [requestOptions, setRequestOptions] =
    useState<AutocompleteRequest | null>(null);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the browser from reloading the page

    const formattedStartDate = formatDate(
      date?.from ?? new Date(),
      "yyyy-MM-dd"
    );
    const formattedEndDate = formatDate(date?.to ?? new Date(), "yyyy-MM-dd");

    generateAIItinerary(
      {
        cityName: cityData?.name ?? "",
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        attractions: includedAttractions ?? [],
      },
      {
        onSettled(data) {
          //   Create a row in Itinerary table
          if (data) {
            const newParsedData = JSON.parse(
              data?.choices[0]?.message.content ?? ""
            ) as ParsedAIMessageInterface[];

            createItinerary({
              cityId: cityData?.id ?? "",
              details: newParsedData,
              title: `${newParsedData.length} days in ${cityData?.name}`,
            });
          }
        },
      }
    );
  };
  const placeResult = cityData?.placeResult as unknown as PlaceResultWithLatLng;

  // set showLoading to true when isLoadingAI or isCreatingItinerary or isMutating is true
  useEffect(
    function showLoadingEffect() {
      if (isLoadingAI || isCreatingItinerary || isMutating)
        setShowLoading(true);
      else setShowLoading(false);
    },
    [isLoadingAI, isCreatingItinerary, isMutating]
  );

  const handleAddUpvotedAttractions = () => {
    if (attractionsUpvotedByUser) {
      setIncludedAttractions((prev) => {
        // Create a new Set from the existing attractions
        const updatedAttractionsSet = new Set(prev);

        // Add only new attractions that aren't already included
        attractionsUpvotedByUser.forEach((attraction) => {
          updatedAttractionsSet.add(attraction);
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

      const lat = placeResult.geometry.location.lat;
      const lng = placeResult.geometry.location.lng;
      const CITY_COORDINATES = { lat, lng };

      setRequestOptions(
        createRequestOptions(
          RequestOptionType.Establishment,
          "", // Add the user's input here
          CITY_COORDINATES,
          SEARCH_RADIUS,
          google.maps
        )
      );
    }
  }, [placeResult.geometry.location]);

  return (
    <GoogleMapsWrapper
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ""}
      libraries={["places"]}
    >
      <div className="my-8 flex h-full flex-col items-center">
        {/* Launcher */}
        <form
          className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-xl ring-1 ring-gray-900/5"
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
                  <SignedOut>
                    <p className=" text-red-800">
                      **Please sign in to personalize your itinerary
                    </p>
                  </SignedOut>

                  <SignedIn>
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-gray-900">
                        Included Attractions
                      </p>
                      <button
                        className="text-md flex items-center rounded bg-blue-300 px-1  font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                        onClick={handleAddUpvotedAttractions}
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
                                onClick={() =>
                                  handleRemoveAttraction(attraction)
                                }
                                className="absolute right-0 cursor-pointer group-hover:inline sm:hidden"
                              >
                                <XMarkIcon className="h-5 w-5 text-red-800" />
                              </span>
                            </li>
                          );
                        }
                      )}
                    </ul>
                  </SignedIn>
                </div>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="grid grid-cols-1">
            {/* Cancel Button shows when loading results */}
            {showLoading && (
              <div className="grid grid-cols-1">
                <button
                  className="flex items-center justify-center gap-x-2.5 bg-red-300 p-3 font-semibold text-gray-900 hover:bg-red-100"
                  onClick={() => setShowCityLaunch(false)}
                >
                  Cancel
                </button>
              </div>
            )}

            {/* Go to Itinerary button shows when itinerary is created */}
            {!showLoading && itineraryCreated && (
              <a
                href={`/itinerary/${itineraryData?.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-x-2.5 bg-blue-300 p-3 font-semibold text-gray-900 hover:bg-blue-100"
              >
                Go to Itinerary
              </a>
            )}
          </div>

          {/* Make Itinerary and Cancel button (side by side) show when nothing is loading */}
          {!showLoading && (
            <div
              className={`grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50`}
            >
              <button
                className="flex items-center justify-center gap-x-2.5 bg-green-300 p-3 font-semibold text-gray-900 hover:bg-green-100"
                type="submit"
              >
                Make Itinerary
              </button>

              {/* Cancel*/}
              <button
                className="flex items-center justify-center gap-x-2.5 bg-red-300 p-3 font-semibold text-gray-900 hover:bg-red-100"
                onClick={() => setShowCityLaunch(false)}
                type="button"
              >
                Cancel
              </button>
            </div>
          )}
        </form>
      </div>
    </GoogleMapsWrapper>
  );
};

export default CityLaunch;
