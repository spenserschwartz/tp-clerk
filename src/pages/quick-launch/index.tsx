import { type NextPage } from "next";
import { type MouseEvent, useState } from "react";
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

  const parsedData = JSON.parse(
    generatedAIMessage
  ) as ParsedAIMessageInterface[];

  return (
    <div>
      {isLoadingAI || cityNamesLoading ? (
        <LoadingSpinner size={64} />
      ) : (
        <div>
          {generatedAIMessage ? (
            <div>
              <Button buttonText={"New Itinerary"} />
              {parsedData.map((itineraryDay) => (
                <div key={`generatedAIMessage:${itineraryDay.dayOfWeek}`}>
                  {itineraryDay.dayOfWeek}
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
