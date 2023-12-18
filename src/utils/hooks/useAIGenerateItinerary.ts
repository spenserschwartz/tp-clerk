import { toast } from "react-hot-toast";
import { api } from "~/utils/api";

const useAIGenerateItinerary = () => {
  const {} = api.openAI.generateTripItinerary.useMutation({
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
};

export default useAIGenerateItinerary;
