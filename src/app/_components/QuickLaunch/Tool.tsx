"use client";
import { useUser } from "@clerk/nextjs";
import { APIProvider as GoogleAPIProvider } from "@vis.gl/react-google-maps";
import { addDays, format as formatDate } from "date-fns";
import { useEffect, useState } from "react";
import { type DateRange } from "react-day-picker";
import toast from "react-hot-toast";
import { api } from "~/trpc/react";

import {
  Button,
  Itinerary,
  LoadingPage,
  LoadingSection,
  PlacesAutoComplete,
  Select,
} from "@/components";

import { quickLaunchCities, unknownClerkCity } from "@/constants";
import { revalidateUserPage } from "~/server/actions";
import { type QuickLaunchItineraryType } from "~/types/common";
import type { AutocompleteRequest, PlaceResult } from "~/types/google";
import type { ParsedAIMessageInterface } from "~/types/openai";
import {
  useAIGenerateItinerary,
  useCreateItinerary,
  useProgressRouter,
} from "~/utils/hooks";
import DateRangePicker from "../DateRangePicker";

const QuickLaunchTool = () => {
  const { isSignedIn } = useUser();
  const router = useProgressRouter();
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const autocompleteRequest: AutocompleteRequest = {
    input: "",
    types: ["(cities)"],
  };
  const [chosenCustomCity, setChosenCustomCity] = useState<PlaceResult | null>(
    null,
  );
  const [customCityPhoto, setCustomCityPhoto] = useState<string | undefined>(
    undefined,
  );
  const [chosenCityName, setChosenCityName] = useState("");
  const [generatedAIMessage, setGeneratedAIMessage] = useState("");
  const [customCity, setCustomCity] = useState(false);
  const [adventureToggle, setAdventureToggle] = useState(false);
  const [relaxationToggle, setRelaxationToggle] = useState(false);
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 3),
  });
  const [quickLaunchItineraryData, setQuickLaunchItineraryData] =
    useState<QuickLaunchItineraryType>({ details: [] });
  const [parsedData, setParsedData] = useState<ParsedAIMessageInterface[]>([]);
  const { data: cityData, refetch } = api.city.getCityDataByName.useQuery({
    name: chosenCityName,
  });
  const {
    createItinerary,
    isCreatingItinerary,
    itineraryCreated,
    itineraryData,
    resetItineraryStatus,
  } = useCreateItinerary();

  const {
    generateAIItinerary,
    isLoadingAI,
    itineraryAIGenerated,
    itineraryAI,
  } = useAIGenerateItinerary();

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the browser from reloading the page

    // If no city is chosen, toast error
    if (!chosenCityName) toast.error("Please choose a city!");
    else {
      const formattedStartDate = formatDate(
        date?.from ?? new Date(),
        "yyyy-MM-dd",
      );
      const formattedEndDate = formatDate(date?.to ?? new Date(), "yyyy-MM-dd");

      setAdventureToggle(false);
      setRelaxationToggle(false);

      generateAIItinerary({
        cityName: chosenCityName,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        adventureToggle,
        relaxationToggle,
      });
    }
  };

  const saveItineraryHandler = () => {
    if (!isSignedIn) {
      toast.error("Please sign in to save your itinerary!");
      return;
    }
    if (parsedData.length > 0) {
      const itineraryTitle =
        parsedData.length && chosenCityName
          ? `${parsedData.length} days in ${chosenCityName}`
          : null;

      createItinerary({
        cityId: cityData?.id ?? unknownClerkCity.id,
        details: parsedData,
        title: itineraryTitle,
        cityName: chosenCityName,
        imageURL: customCityPhoto,
        placeId: chosenCustomCity?.place_id,
      });
    }

    // Revalidate user page after saving itinerary
    void revalidateUserPage();
  };

  // Set generatedAIMessage once itineraryAI is generated
  useEffect(() => {
    if (itineraryAIGenerated && itineraryAI)
      setGeneratedAIMessage(itineraryAI?.choices[0]?.message.content ?? "");
  }, [itineraryAIGenerated, itineraryAI]);

  // Refetch city data when chosenCityName changes
  useEffect(() => {
    refetch;
  }, [chosenCityName, refetch]);

  // Set parsedData that shows on generation
  useEffect(() => {
    if (generatedAIMessage) {
      try {
        const newParsedData = JSON.parse(
          generatedAIMessage,
        ) as ParsedAIMessageInterface[];
        setParsedData(newParsedData);

        const newQuickLaunchItineraryData: QuickLaunchItineraryType = {
          details: newParsedData,
        };
        setQuickLaunchItineraryData(newQuickLaunchItineraryData);
      } catch (error) {
        console.error(error);
      }
    }
  }, [generatedAIMessage]);

  // Set chosenCityName and cityPhoto when chosenCustomCity changes
  useEffect(() => {
    setChosenCityName(chosenCustomCity?.formatted_address ?? "");

    const cityPhoto = chosenCustomCity?.photos?.[0]?.getUrl() ?? undefined;
    setCustomCityPhoto(cityPhoto);
  }, [chosenCustomCity]);

  const handleCreateNewItinerary = () => {
    setParsedData([]);
    resetItineraryStatus();
  };

  if (!apiKey) return <LoadingPage />;
  return (
    <GoogleAPIProvider apiKey={apiKey}>
      <div className="my-8 flex h-full flex-col items-center">
        {/* Loading Page */}
        {(isLoadingAI || isCreatingItinerary) && <LoadingSection />}

        {/* Quick Launch Form */}
        {!isLoadingAI && !parsedData.length && (
          <div className="mx-auto w-full md:w-96 md:max-w-full">
            <div className="border border-gray-600  bg-gray-800 p-6 sm:rounded-md">
              <form onSubmit={handleFormSubmit}>
                {/* Destination */}
                <div className="mb-6 block w-[300px] font-medium leading-6 text-gray-300">
                  <p className="flex justify-between">
                    <span>Where do you want to go?</span>
                    <span
                      className="cursor-pointer text-blue-600 hover:text-blue-700"
                      onClick={() => setCustomCity(!customCity)}
                    >
                      {customCity ? "Prefilled" : "Custom"}
                    </span>
                  </p>

                  {!customCity ? (
                    <Select
                      options={quickLaunchCities}
                      selected={chosenCityName}
                      setSelected={setChosenCityName}
                    />
                  ) : (
                    <div>
                      <PlacesAutoComplete
                        setSelected={setChosenCustomCity}
                        requestOptions={autocompleteRequest}
                      />
                    </div>
                  )}
                </div>

                {/* Date Range Picker */}
                <span className="text-gray-300">Choose your dates</span>
                <DateRangePicker date={date} setDate={setDate} />

                {/* Adventure Option */}
                <div className="mt-4 flex flex-col">
                  <label className="fl">
                    <input
                      name="adventureOption"
                      type="checkbox"
                      className="rounded-full border-gray-600 bg-transparent  placeholder-gray-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 focus:ring-offset-0"
                      onChange={() => setAdventureToggle((prev) => !prev)}
                    />
                    <span className="ml-2 text-gray-300">
                      Add some extra adventure!
                    </span>
                  </label>

                  <label className="fl">
                    <input
                      name="adventureOption"
                      type="checkbox"
                      className="rounded-full border-gray-600 bg-transparent  placeholder-gray-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 focus:ring-offset-0"
                      onChange={() => setRelaxationToggle((prev) => !prev)}
                    />
                    <span className="ml-2 text-gray-300">
                      Give some time to relax!
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <div className="mt-6 flex justify-center">
                  <button
                    type="submit"
                    className="focus:shadow-outline h-10 rounded-lg bg-indigo-700 px-5 text-indigo-100 transition-colors duration-150 hover:bg-indigo-800"
                  >
                    Make an itinerary!
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Display Generated Itinerary */}
        {parsedData.length > 0 && !isCreatingItinerary && (
          <div className="flex flex-col items-center">
            <div className="flex">
              {/* Button to create new itinerary */}
              <Button
                buttonText="Create new itinerary"
                buttonClickHandler={() => handleCreateNewItinerary()}
                size="xl"
              />

              {!itineraryCreated && (
                <button
                  className="ml-4 rounded bg-green-500 px-3.5 py-3 text-xs font-semibold text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  onClick={saveItineraryHandler}
                >
                  Save Itinerary
                </button>
              )}

              {itineraryCreated && (
                <button
                  className="ml-4 rounded bg-blue-500 px-3.5 py-3 text-xs font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  onClick={() =>
                    void router.push(`/itinerary/${itineraryData?.id}`)
                  }
                >
                  Go to Itinerary
                </button>
              )}
            </div>

            <Itinerary data={quickLaunchItineraryData} />
          </div>
        )}
      </div>
    </GoogleAPIProvider>
  );
};

export default QuickLaunchTool;
