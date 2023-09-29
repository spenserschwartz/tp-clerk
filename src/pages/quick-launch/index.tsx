import { type NextPage } from "next";
import { type MouseEvent, useState } from "react";
import toast from "react-hot-toast";
import { LoadingSpinner, Modal } from "~/components";
import QuickLaunchForm from "~/components/forms/quickLaunch";
import { api } from "~/utils/api";

const QuickLaunchPage: NextPage = () => {
  const [generatedAIMessage, setGeneratedAIMessage] = useState("");
  const { mutate, isLoading: isLoadingAI } =
    api.openAI.generateTripItinerary.useMutation({});

  const { data: cityNames, isLoading: cityNamesLoading } =
    api.city.getAllCityNames.useQuery();

  console.log("generatedAIMessage", generatedAIMessage);

  return (
    <div>
      {isLoadingAI ? (
        <LoadingSpinner size={64} />
      ) : (
        <div>
          <QuickLaunchForm
            cityNames={cityNames}
            setGeneratedMessage={setGeneratedAIMessage}
          />
        </div>
      )}
    </div>
  );
};

export default QuickLaunchPage;
