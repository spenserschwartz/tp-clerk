import { addDays, format as formatDate } from "date-fns";
import React, { useEffect, useState } from "react";
import { type DateRange } from "react-day-picker";

import { Button, LoadingPage, LoadingSpinner } from "~/components";
import { DatePickerWithRange } from "~/ui/datePickerWithRange";
import { api } from "~/utils/api";
import QuickLaunchForm from "../forms/quickLaunch";
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
    to: addDays(new Date(), 7),
  });
  const [parsedData, setParsedData] = useState<ParsedAIMessageInterface[]>([]);
  const { mutate, isLoading: isLoadingAI } =
    api.openAI.generateTripItinerary.useMutation({});

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the browser from reloading the page

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
          if (data) {
            setGeneratedAIMessage(data?.choices[0]?.message.content ?? "");
          }
        },
      }
    );
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
    <div>
      isLoadingAI: {isLoadingAI ? "true" : "false"}
      {isLoadingAI && <LoadingPage />}
      {/* Display Itinerary */}
      {!isLoadingAI && (
        <div className="mx-auto w-full md:w-96 md:max-w-full">
          <div className="border border-gray-600  bg-gray-800 p-6 sm:rounded-md">
            <form onSubmit={handleFormSubmit}>
              {/* Destination */}
              <label className="mb-6 block">
                <span className="text-gray-300">Where do you want to go?</span>
                <select
                  name="present"
                  className="mt-1 w-full rounded-md border-gray-600 bg-transparent text-gray-300 placeholder-gray-600 shadow-sm selection:block focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setChosenCityName(e.target.value)
                  }
                  defaultValue={""}
                >
                  <option disabled value="">
                    Select a city
                  </option>
                  {/* Map out cityNames */}
                  {quickLaunchCities.map((cityName) => (
                    <option key={`QuickLaunchOption:${cityName}`}>
                      {cityName}
                    </option>
                  ))}
                </select>
              </label>

              {/* Date Range Picker */}
              <DatePickerWithRange date={date} setDate={setDate} />

              {/* Adventure Option */}
              <label className="">
                <input
                  name="adventureOption"
                  type="checkbox"
                  className="rounded-full border-gray-600 bg-transparent  placeholder-gray-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 focus:ring-offset-0"
                />
                <span className="ml-2 text-gray-300">
                  Add some extra adventure!
                </span>
              </label>

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
      <div>
        {parsedData.length && (
          <div className="h-80 overflow-y-scroll bg-gray-200">
            {parsedData.map((itineraryDay) => (
              <div key={`generatedAIMessage:${itineraryDay.dayOfWeek}`}>
                <p className="text-font-bold mt-2 text-center text-xl text-orange-500">
                  {itineraryDay.date} - {itineraryDay.dayOfWeek}
                </p>

                <ul className="ms-8 list-outside list-disc">
                  <li className="mb-1">Morning: {itineraryDay.morning}</li>
                  <li>Afternoon: {itineraryDay.afternoon}</li>
                  <li>Evening: {itineraryDay.evening}</li>
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickLaunch;
