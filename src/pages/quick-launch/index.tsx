import { type NextPage } from "next";
import { type MouseEvent, useState } from "react";
import toast from "react-hot-toast";
import { LoadingSpinner } from "~/components";
import { api } from "~/utils/api";

const QuickLaunchPage: NextPage = () => {
  const [aiText, setAiText] = useState("aiText will be generated here");

  const { mutate, isLoading: isLoadingAI } =
    api.openAI.generateTripItinerary.useMutation({});

  const handleGenerateTextWithAI = () => {
    console.log("handleGenerateTextWithAI");
    mutate("hello", {
      onSettled(data, error, variables, context) {
        if (error) console.error(error);
        if (data) console.log("data", data);

        // setAiText(data?.choices[0]?.message.content ?? "");
      },
    });
  };

  return (
    <div>
      {isLoadingAI ? (
        <LoadingSpinner size={64} />
      ) : (
        <div>
          <button onClick={handleGenerateTextWithAI}>Click for AI</button>
          <p>{aiText}</p>
        </div>
      )}
    </div>
  );
};

export default QuickLaunchPage;
