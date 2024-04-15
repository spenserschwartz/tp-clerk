import { toast } from "react-hot-toast";
import { api } from "~/trpc/react";

const useDeleteItinerary = () => {
  const {
    mutate: deleteItinerary,
    isPending: isDeletingItinerary,
    isSuccess: itineraryDeleted,
  } = api.itinerary.delete.useMutation({
    onSuccess: () => {
      console.log("DeleteItinerary Success");
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      if (errorMessage?.[0]) {
        toast.error(errorMessage[0]);
      } else {
        toast.error("Failed to delete itinerary! Please try again later.");
      }
    },
  });

  return {
    deleteItinerary,
    isDeletingItinerary,
    itineraryDeleted,
  };
};

export default useDeleteItinerary;
