"use client";
import { Avatar } from "@/components/index";
import type { QuickLaunchItineraryType } from "~/types/common";
import type { ParsedAIMessageInterface } from "~/types/openai";
import { type ItineraryWithCityInfoType } from "~/types/router";
import { ZoomInUpWrapper } from "../framer-motion";
import { unknownClerkUser, unknownItinerary } from "../utils";

interface ItineraryProps {
  data: ItineraryWithCityInfoType | QuickLaunchItineraryType;
}

const Itinerary = ({ data }: ItineraryProps) => {
  const details: ParsedAIMessageInterface[] =
    data.details as unknown as ParsedAIMessageInterface[];
  const { id: itineraryID } = data;

  const itineraryUserId = data?.userId ?? unknownClerkUser.id;

  return (
    <ZoomInUpWrapper>
      <div className="w-full max-w-5xl overflow-hidden overflow-y-auto rounded-lg bg-gray-100 shadow-xl ">
        {/* Title */}
        <div className="flex items-center justify-between p-4">
          <h1 className="text-4xl font-bold text-gray-900">Itinerary</h1>
          {itineraryID !== unknownItinerary.id && (
            <Avatar userId={itineraryUserId} />
          )}
        </div>

        {/* Content */}
        <div className="px-4">
          {details.length ? (
            <div className="">
              {details.map((itineraryDay) => (
                <div key={`generatedAIMessage:${itineraryDay.dayOfWeek}`}>
                  <h1 className="text-xl font-semibold text-gray-800">
                    {itineraryDay.date} - {itineraryDay.dayOfWeek}
                  </h1>
                  <div className="flex items-center justify-between text-sm text-gray-700">
                    {/* Morning, Afternoon, Evening */}
                    <ul className="ms-8 list-outside list-disc">
                      <li className="my-1">Morning: {itineraryDay.morning}</li>
                      <li className="my-1">
                        Afternoon: {itineraryDay.afternoon}
                      </li>
                      <li className="my-1">Evening: {itineraryDay.evening}</li>
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </ZoomInUpWrapper>
  );
};

export default Itinerary;
