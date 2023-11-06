import { addDays, format as formatDate } from "date-fns";
import React, { useEffect, useState } from "react";
import { type DateRange } from "react-day-picker";
import toast from "react-hot-toast";
import { DatePickerWithRange } from "~/ui/datePickerWithRange";
import { api } from "~/utils/api";

import { useUser } from "@clerk/nextjs";
import { Button, Itinerary, LoadingSection, Select } from "~/components";
import { type ParsedAIMessageInterface } from "~/types";
import { GetCityByNameType } from "~/types/router";
import useCreateItinerary from "~/utils/hooks/useCreateItinerary";

interface CityLaunchProps {
  cityData: GetCityByNameType;
}

const CityLaunch = ({ cityData }: CityLaunchProps) => {
  const { isSignedIn, user } = useUser();
  const { createItinerary, isCreatingItinerary, itineraryCreated } =
    useCreateItinerary();
  const { data: userUpvoteData } = api.upvotes.getAllByUserInCity.useQuery({
    cityId: cityData?.id ?? "",
    userId: user ? user.id : "",
  });
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 3),
  });

  const { mutate: generateAI, isLoading: isLoadingAI } =
    api.openAI.generateTripItinerary.useMutation({});

  const attractionsUpvotedByUser: string[] | undefined = userUpvoteData?.map(
    (upvote) => upvote.attraction.name
  );

  console.log("itin created", itineraryCreated);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the browser from reloading the page

    const formattedStartDate = formatDate(
      date?.from ?? new Date(),
      "yyyy-MM-dd"
    );
    const formattedEndDate = formatDate(date?.to ?? new Date(), "yyyy-MM-dd");

    generateAI(
      {
        cityName: cityData?.name ?? "",
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        attractions: attractionsUpvotedByUser ?? [],
      },
      {
        onSettled(data, error) {
          if (error) toast.error("Failed to generate itinerary!");

          //   Create a row in Itinerary table
          if (data) {
            const newParsedData = JSON.parse(
              data?.choices[0]?.message.content ?? ""
            ) as ParsedAIMessageInterface[];

            createItinerary({
              cityId: cityData?.id ?? "",
              details: newParsedData,
            });
          }
        },
      }
    );
  };

  return (
    <div className="my-8 flex h-full flex-col items-center">
      {" "}
      <div>itineraryCreated: {itineraryCreated ? "true" : "false"}</div>
      {(isLoadingAI || isCreatingItinerary) && <LoadingSection />}
      <div className="mx-auto w-full md:w-96 md:max-w-full">
        <div className="border border-gray-600  bg-gray-800 p-6 sm:rounded-md">
          <form onSubmit={handleFormSubmit}>
            {/* Destination */}
            <div className="mb-6 block w-[300px] text-white">
              <p className="text-gray-300">Included Attractions</p>
              <ul className="">
                {attractionsUpvotedByUser?.map((attraction) => {
                  return <li key={attraction}>{attraction}</li>;
                })}
              </ul>
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
    </div>
  );
};

export default CityLaunch;
