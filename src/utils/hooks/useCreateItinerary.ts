import { toast } from "react-hot-toast";
import { api } from "~/trpc/react";

const useCreateItinerary = () => {
  const {
    mutate: createItinerary,
    isPending: isCreatingItinerary,
    isSuccess: itineraryCreated,
    data: itineraryData,
  } = api.itinerary.create.useMutation({
    onSuccess: () => {
      toast.success("Itinerary created!");
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      if (errorMessage?.[0]) {
        toast.error(errorMessage[0]);
      } else {
        toast.error("Failed to create itinerary! Please try again later.");
      }
    },
    onSettled(data, error) {
      if (error) console.error(error);
    },
  });
  return {
    createItinerary,
    isCreatingItinerary,
    itineraryCreated,
    itineraryData,
  };
};

export default useCreateItinerary;
