import { type ParsedAIMessageInterface } from "~/types";
import { api } from "~/utils/api";
import Avatar from "../avatar";

import { unknownClerkUser } from "../utils";

interface ItineraryProps {
  parsedData: ParsedAIMessageInterface[];
  itineraryID?: string;
}

const Itinerary = ({
  parsedData,
  itineraryID = unknownClerkUser.id,
}: ItineraryProps) => {
  const { data: itineraryUserData } = api.itinerary.getByID.useQuery({
    id: itineraryID,
  });
  const itineraryUserId = itineraryUserData?.userId ?? unknownClerkUser.id;

  return (
    <div data-aos="zoom-in">
      {parsedData.length ? (
        <div className="flex h-full max-w-5xl flex-col items-center">
          {/* Itinerary */}
          <div className="my-4 flex h-full flex-col overflow-y-auto rounded-xl bg-gray-800 pb-3 pr-2 shadow-xl sm:max-h-80">
            {/* Map through each day */}
            {parsedData.map((itineraryDay) => (
              <div key={`generatedAIMessage:${itineraryDay.dayOfWeek}`}>
                {/* Date and day of week */}
                <p className="text-font-bold mt-2 text-center text-xl text-orange-500">
                  {itineraryDay.date} - {itineraryDay.dayOfWeek}
                </p>

                {/* Morning, Afternoon, Evening */}
                <ul className="ms-8 list-outside list-disc text-gray-300">
                  <li className="my-1">Morning: {itineraryDay.morning}</li>
                  <li className="my-1">Afternoon: {itineraryDay.afternoon}</li>
                  <li className="my-1">Evening: {itineraryDay.evening}</li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div className="w-full max-w-5xl overflow-hidden rounded-lg bg-gray-100 shadow-xl">
        {/* Title */}
        <div className="flex items-center justify-between p-4">
          <h1 className="text-4xl font-bold text-gray-900">Itinerary</h1>
          <Avatar userId={itineraryUserId} />
        </div>

        {/* Content */}
        <div className="px-4">
          {/* <h1 className="text-xl font-semibold text-gray-800">Trip to Paris</h1>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>12/1 - 12/9</span>
          </div> */}

          {parsedData.length ? (
            <>
              {parsedData.map((itineraryDay) => (
                <div key={`generatedAIMessage:${itineraryDay.dayOfWeek}`}>
                  <h1 className="text-xl font-semibold text-gray-800">
                    {itineraryDay.date} - {itineraryDay.dayOfWeek}
                  </h1>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>12/1 - 12/9</span>
                  </div>
                </div>
              ))}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Itinerary;
