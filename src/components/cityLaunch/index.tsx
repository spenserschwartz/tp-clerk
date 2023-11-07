import { useUser } from "@clerk/nextjs";
import { addDays, format as formatDate } from "date-fns";
import React, { useState } from "react";
import { type DateRange } from "react-day-picker";
import toast from "react-hot-toast";
import { DatePickerWithRange } from "~/ui/datePickerWithRange";
import { api } from "~/utils/api";

import { LoadingSection } from "~/components";
import { type ParsedAIMessageInterface } from "~/types";
import { type GetCityByNameType } from "~/types/router";
import useCreateItinerary from "~/utils/hooks/useCreateItinerary";
interface CityLaunchProps {
  cityData: GetCityByNameType;
}

const CityLaunch = ({ cityData }: CityLaunchProps) => {
  const { user } = useUser();
  const {
    createItinerary,
    isCreatingItinerary,
    itineraryCreated,
    itineraryData,
  } = useCreateItinerary();
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

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the browser from reloading the page

    console.log("handleFormSubmit");

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
      {(isLoadingAI || isCreatingItinerary) && <LoadingSection />}

      {/* Launcher */}
      <form
        className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-xl ring-1 ring-gray-900/5"
        onSubmit={handleFormSubmit}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleFormSubmit(e);
        }}
      >
        <h2 className="mt-4 text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          City Planner
        </h2>
        <div className="">
          <div className="">
            {/* Date Range Picker */}
            <div className="px-4">
              <span className="font-semibold text-gray-900">
                Choose your dates
              </span>
              <DatePickerWithRange date={date} setDate={setDate} />
            </div>

            {/* Included Attractions, alphabetized */}
            <div className="mt-4 flex w-full flex-col px-4">
              <div className="mb-6 block w-full">
                <p className="font-semibold text-gray-900">
                  Included Attractions
                </p>
                <ul className="max-h-40 w-full list-inside list-disc overflow-y-auto rounded-md ">
                  {attractionsUpvotedByUser?.sort().map((attraction) => {
                    return <li key={attraction}>{attraction}</li>;
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
          <button
            className="flex items-center justify-center gap-x-2.5 bg-green-300 p-3 font-semibold text-gray-900 hover:bg-green-100"
            type="submit"
          >
            Make Itinerary
          </button>
          <a
            href={"#"}
            className="flex items-center justify-center gap-x-2.5 bg-red-300 p-3 font-semibold text-gray-900 hover:bg-red-100"
          >
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
};

export default CityLaunch;
