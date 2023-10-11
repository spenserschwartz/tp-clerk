import { parse } from "path";
import React, { useEffect, useState } from "react";

import { Button, LoadingSpinner } from "~/components";
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
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [generatedAIMessage, setGeneratedAIMessage] = useState("");
  const [parsedData, setParsedData] = useState<ParsedAIMessageInterface[]>([]);

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
    <section className="relative border-2 border-red-300">
      {/* Section background (needs .relative class on parent and next sibling elements) */}
      <div
        className="pointer-events-none absolute inset-0 top-1/2 bg-green-900 md:mt-24 lg:mt-0"
        aria-hidden="true"
      ></div>
      <div className="absolute bottom-0 left-0 right-0 m-auto h-20 w-px translate-y-1/2 transform bg-gray-200 p-px"></div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="mx-auto max-w-3xl pb-12 text-center md:pb-20">
            <h2 className="h2 mb-4">Plan a trip in seconds</h2>
            <p className="text-xl text-gray-600">
              Want a quick itinerary? Fill out the form below and we will
              generate a trip for you using the best attractions in the city.
            </p>
          </div>

          {/* Parsed Itinerary Display */}
          <div className="rounded-lg border-2 border-blue-400">
            {/* Quick Launch Form */}
            <QuickLaunchForm
              cityNames={quickLaunchCities}
              setGeneratedMessage={setGeneratedAIMessage}
              setIsLoadingAI={setIsLoadingAI}
            />
            isLoadingAI
            {isLoadingAI ? "True" : "False"}
            <Button
              buttonText="New Itinerary"
              buttonClickHandler={() => setParsedData([])}
            />
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
      </div>
    </section>
  );
};

export default QuickLaunch;
