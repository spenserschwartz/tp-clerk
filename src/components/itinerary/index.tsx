import { type ParsedAIMessageInterface } from "~/types";

interface ItineraryProps {
  parsedData: ParsedAIMessageInterface[];
}

const Itinerary = ({ parsedData }: ItineraryProps) => {
  return (
    <div>
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
    </div>
  );
};

export default Itinerary;
