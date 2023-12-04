import { addDays, format as formatDate } from "date-fns";
import React, { useEffect, useState } from "react";
import { type DateRange } from "react-day-picker";
import toast from "react-hot-toast";
import { DatePickerWithRange } from "~/ui/datePickerWithRange";
import { api } from "~/utils/api";

import { useUser } from "@clerk/nextjs";
import {
  Button,
  Itinerary,
  LoadingSection,
  NumberInput,
  Select,
} from "~/components";
import { type ParsedAIMessageInterface } from "~/types";
import { useCreateItinerary } from "~/utils/hooks";
import { quickLaunchCities } from "../utils";
import { Toggle } from "./components";

const QuickLaunch = () => {
  const { isSignedIn } = useUser();
  const [chosenCityName, setChosenCityName] = useState("");
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 3),
  });
  const [rangeChoice, setRangeChoice] = useState<"date" | "number">("date");
  const [numberOfDays, setNumberOfDays] = useState(3); // Default to 3 days
  const [generatedAIMessage, setGeneratedAIMessage] = useState("");
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

  const toggleRangeChoice = () =>
    setRangeChoice(rangeChoice === "date" ? "number" : "date");

  return (
    <div className="my-8 flex h-full flex-col items-center" data-aos="fade-up">
      {/* Loading Page */}
      {(isLoadingAI || isCreatingItinerary) && <LoadingSection />}

      {/* Quick Launch Form */}
      {!isLoadingAI && !parsedData.length && (
        <div className="mx-auto w-full md:w-96 md:max-w-full">
          <div className="flex flex-col items-center border-gray-600 bg-gray-800 p-6 sm:rounded-md">
            <form onSubmit={handleFormSubmit}>
              {/* Destination */}
              <div className="mb-6 block w-[300px]">
                <Select
                  options={quickLaunchCities}
                  selected={chosenCityName}
                  setSelected={setChosenCityName}
                />
              </div>

              {/* Date Range Picker */}
              <div className="flex justify-between text-gray-300">
                <p>
                  {rangeChoice === "date"
                    ? "Choose your dates"
                    : "Number of Days"}
                </p>
                <p
                  className="cursor-pointer text-blue-600 hover:text-blue-800"
                  onClick={toggleRangeChoice}
                >
                  {rangeChoice === "date" ? "Use # days" : "Use dates"}
                </p>
              </div>

              <div className="h-7">
                {rangeChoice === "date" && (
                  <DatePickerWithRange date={date} setDate={setDate} />
                )}

                {rangeChoice === "number" && (
                  <NumberInput
                    value={numberOfDays}
                    setValue={setNumberOfDays}
                  />
                )}
              </div>

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

            <button
              className="ml-4 rounded bg-green-500 px-3.5 py-3 text-xs font-semibold text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              onClick={saveItineraryHandler}
            >
              Save Itinerary
            </button>
          </div>
          <Itinerary parsedData={parsedData} />
        </div>
      )}
    </div>
  );
};

export default QuickLaunch;
