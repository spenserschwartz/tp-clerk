import { toast } from "react-hot-toast";
import { api } from "~/trpc/react";

const useAIGenerateItinerary = () => {
  const {
    mutate: generateAIItinerary,
    isPending: isLoadingAI,
    isSuccess: itineraryAIGenerated,
    data: itineraryAI,
  } = api.openAI.generateTripItinerary.useMutation({
    onSuccess: () => {
      toast.success("Itinerary generated via AI!");
    },

    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      if (errorMessage?.[0]) {
        toast.error(errorMessage[0]);
      } else {
        toast.error("Failed to create itinerary! Please try again later.");
      }
    },

    onSettled: (_, error) => {
      if (error) console.error(error);
    },
  });

  return {
    generateAIItinerary,
    isLoadingAI,
    itineraryAIGenerated,
    itineraryAI,
  };
};

export default useAIGenerateItinerary;
