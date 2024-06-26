import { toast } from "react-hot-toast";
import { api } from "~/trpc/react";

const useEditItineraryUserNotes = () => {
  const {
    mutate: editItineraryUserNotes,
    isPending: isEditingItineraryUserNotes,
    isSuccess: itineraryUserNotesEdited,
    data: itineraryData,
  } = api.itinerary.editUserNotes.useMutation({
    onSuccess: () => {
      toast.success("Itinerary Notes Updated!");
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      if (errorMessage?.[0]) {
        toast.error(errorMessage[0]);
      } else {
        toast.error("Failed to edit itinerary notes! Please try again later.");
      }
    },
    onSettled(_, error) {
      if (error) console.error(error);
    },
  });

  return {
    editItineraryUserNotes,
    isEditingItineraryUserNotes,
    itineraryUserNotesEdited,
    itineraryData,
  };
};

export default useEditItineraryUserNotes;
