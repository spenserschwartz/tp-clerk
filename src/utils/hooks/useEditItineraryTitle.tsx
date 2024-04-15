import { toast } from "react-hot-toast";
import { api } from "~/trpc/react";

const useEditItineraryTitle = () => {
  const {
    mutate: editItineraryTitle,
    isPending: isEditingItineraryTitle,
    isSuccess: itineraryTitleEdited,
    data: itineraryData,
  } = api.itinerary.editTitle.useMutation({
    onSuccess: () => {
      toast.success("Itinerary Title Updated!");
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      if (errorMessage?.[0]) {
        toast.error(errorMessage[0]);
      } else {
        toast.error("Failed to edit itinerary title! Please try again later.");
      }
    },
    onSettled(data, error) {
      if (error) console.error(error);
    },
  });

  return {
    editItineraryTitle,
    isEditingItineraryTitle,
    itineraryTitleEdited,
    itineraryData,
  };
};

export default useEditItineraryTitle;
