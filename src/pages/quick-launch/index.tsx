import { type NextPage } from "next";
import { type MouseEvent, useState } from "react";
import toast from "react-hot-toast";
import { LoadingSpinner, Modal } from "~/components";
import QuickLaunchForm from "~/components/forms/quickLaunch";
import { api } from "~/utils/api";

const QuickLaunchPage: NextPage = () => {
  const [aiText, setAiText] = useState("aiText will be generated here");
  const { mutate, isLoading: isLoadingAI } =
    api.openAI.generateTripItinerary.useMutation({});

  const { data: cityNames, isLoading: cityNamesLoading } =
    api.city.getAllCityNames.useQuery();

  console.log("cityNames", cityNames);

  const handleGenerateTextWithAI = () => {
    console.log("handleGenerateTextWithAI");
    // mutate("Berlin", {
    //   onSettled(data, error, variables, context) {
    //     if (error) console.error(error);
    //     if (data) console.log("data", data);

    //     const parsedData = JSON.parse(
    //       data?.choices[0]?.message.content ?? "{}"
    //     ) as Record<string, string>;

    //     console.log("PARSE", parsedData);

    //     setAiText(data?.choices[0]?.message.content ?? "");
    //   },
    // });
  };

  return (
    <div>
      {isLoadingAI ? (
        <LoadingSpinner size={64} />
      ) : (
        <div>
          <button onClick={handleGenerateTextWithAI}>Generate Your Trip</button>
          <p>{aiText}</p>
          <QuickLaunchForm cityNames={cityNames} />
        </div>
      )}
    </div>
  );
};

export default QuickLaunchPage;
