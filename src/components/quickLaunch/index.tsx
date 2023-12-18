import { useUser } from "@clerk/nextjs";
import { useLoadScript, type Libraries } from "@react-google-maps/api";
import { addDays, format as formatDate } from "date-fns";
import { useEffect, useState } from "react";
import { type DateRange } from "react-day-picker";
import toast from "react-hot-toast";
import { DatePickerWithRange } from "~/ui/datePickerWithRange";
import { api } from "~/utils/api";

import {
  Button,
  Itinerary,
  LoadingSection,
  PlacesAutoComplete,
  Select,
} from "~/components";
import { type ParsedAIMessageInterface } from "~/types";
import { useCreateItinerary } from "~/utils/hooks";
import { quickLaunchCities } from "../utils";

const libraries: Libraries = ["places"];

const QuickLaunch = () => {
  const { isSignedIn } = useUser();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
    libraries,
  });
  const [chosenCityName, setChosenCityName] = useState("");
  const [generatedAIMessage, setGeneratedAIMessage] = useState("");
  const [customCity, setCustomCity] = useState(false);
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 3),
  });
  const [parsedData, setParsedData] = useState<ParsedAIMessageInterface[]>([]);

  const { createItinerary, isCreatingItinerary } = useCreateItinerary();

  const { mutate, isLoading: isLoadingAI } =
    api.openAI.generateTripItinerary.useMutation({});

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the browser from reloading the page

    // If no city is chosen, toast error
    if (!chosenCityName) toast.error("Please choose a city!");
    else {
      const formattedStartDate = formatDate(
        date?.from ?? new Date(),
        "yyyy-MM-dd"
      );
      const formattedEndDate = formatDate(date?.to ?? new Date(), "yyyy-MM-dd");

      mutate(
        {
          cityName: chosenCityName,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        },
        {
          onSettled(data, error) {
            if (error) console.error(error);
            console.log("onSettled data", data);

            if (data) {
              setGeneratedAIMessage(data?.choices[0]?.message.content ?? "");
            }
          },
        }
      );
    }
  };

  const { data: cityData, refetch } = api.city.getCityByName.useQuery({
    name: chosenCityName,
  });

  useEffect(() => {
    refetch;
  }, [chosenCityName, refetch]);

  const saveItineraryHandler = () => {
    if (!isSignedIn) {
      toast.error("Please sign in to save your itinerary!");
      return;
    }
    if (parsedData.length > 0) {
      createItinerary({
        cityId: cityData?.id ?? "city not found",
        details: parsedData,
      });
    }
  };

  // Set parsedData that shows on generation
  useEffect(() => {
    if (generatedAIMessage) {
      try {
        const newParsedData = JSON.parse(
          generatedAIMessage
        ) as ParsedAIMessageInterface[];
        setParsedData(newParsedData);
      } catch (error) {
        console.error(error);
      }
    }
  }, [generatedAIMessage]);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    isLoaded && (
      <div
        className="my-8 flex h-full flex-col items-center"
        // ! data-aos="fade-up"  >>> Let's remove for better library
      >
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
                      <PlacesAutoComplete setSelected={setChosenCityName} />
                    </div>
                  )}
                </div>

                {/* Date Range Picker */}
                <span className="text-gray-300">Choose your dates</span>
                <DatePickerWithRange date={date} setDate={setDate} />

                {/* Adventure Option */}
                <div className="mt-4 flex flex-col">
                  <label className="fl">
                    <input
                      name="adventureOption"
                      type="checkbox"
                      className="rounded-full border-gray-600 bg-transparent  placeholder-gray-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 focus:ring-offset-0"
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
                    />
                    <span className="ml-2 text-gray-300">
                      Give some extra time to explore!
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
        {parsedData.length > 0 && (
          <div className="flex flex-col items-center">
            <div className="flex">
              {/* Button to create new itinerary */}
              <Button
                buttonText="Create new itinerary"
                buttonClickHandler={() => setParsedData([])}
                size="xl"
              />

              {!customCity && (
                <button
                  className="ml-4 rounded bg-green-500 px-3.5 py-3 text-xs font-semibold text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  onClick={saveItineraryHandler}
                >
                  Save Itinerary
                </button>
              )}
            </div>
            <Itinerary parsedData={parsedData} />
          </div>
        )}
      </div>
    )
  );
};

export default QuickLaunch;
