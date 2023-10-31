import { addDays, format as formatDate } from "date-fns";
import React, { useEffect, useState } from "react";
import { type DateRange } from "react-day-picker";
import { DatePickerWithRange } from "~/ui/datePickerWithRange";

import toast from "react-hot-toast";
import { Itinerary, LoadingSection, Select } from "~/components";
import { api } from "~/utils/api";
import { quickLaunchCities } from "../utils";

interface ParsedAIMessageInterface {
  dayOfWeek: string;
  date: string;
  morning: string;
  afternoon: string;
  evening: string;
}

const QuickLaunch = () => {
  const [chosenCityName, setChosenCityName] = useState("");
  const [generatedAIMessage, setGeneratedAIMessage] = useState("");
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 3),
  });
  const [parsedData, setParsedData] = useState<ParsedAIMessageInterface[]>([]);

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

  return (
    <div className="my-8 flex h-full flex-col items-center">
      {/* Loading Page */}
      {isLoadingAI && <LoadingSection />}

      {/* Quick Launch Form */}
      {!isLoadingAI && !parsedData.length && (
        <div className="mx-auto w-full md:w-96 md:max-w-full">
          <div className="border border-gray-600  bg-gray-800 p-6 sm:rounded-md">
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
      <Itinerary parsedData={parsedData} setParsedData={setParsedData} />
    </div>
  );
};

export default QuickLaunch;
