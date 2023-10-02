import { type NextPage } from "next";
import { type MouseEvent, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { LoadingSpinner, Modal } from "~/components";
import Button from "~/components/button";
import QuickLaunchForm from "~/components/forms/quickLaunch";
import { api } from "~/utils/api";

interface ParsedAIMessageInterface {
  dayOfWeek: string;
  date: string;
  morning: string;
  afternoon: string;
  evening: string;
}

const QuickLaunchPage: NextPage = () => {
  const [generatedAIMessage, setGeneratedAIMessage] = useState("");
  const [parsedData, setParsedData] = useState<ParsedAIMessageInterface[]>([]);

  const [showForm, setShowForm] = useState(false);

  const { mutate, isLoading: isLoadingAI } =
    api.openAI.generateTripItinerary.useMutation({});

  const { data: cityNames, isLoading: cityNamesLoading } =
    api.city.getAllCityNames.useQuery();

  console.log("generatedAIMessage", generatedAIMessage);
  console.log(
    "PARSED",
    generatedAIMessage ? JSON.parse(generatedAIMessage) : {}
  );

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
      {isLoadingAI || cityNamesLoading ? (
        <LoadingSpinner size={64} />
      ) : (
        <div>
          {parsedData.length ? (
            <div>
              <div className="mt-3 flex justify-center">
                <Button buttonText="New Itinerary" />
              </div>

              {/* Parsed Itinerary Display */}
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
          ) : (
            <QuickLaunchForm
              cityNames={cityNames}
              setGeneratedMessage={setGeneratedAIMessage}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default QuickLaunchPage;
