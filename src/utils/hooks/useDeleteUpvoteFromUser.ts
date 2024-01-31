import { toast } from "react-hot-toast";
import { api } from "~/utils/api";

const useDeleteUpvoteFromUser = () => {
  const {
    mutate: deleteUpvoteFromUser,
    isLoading: isDeletingUpvote,
    isSuccess: upvoteDeleted,
    isError: deleteUpvoteError,
  } = api.upvotes.delete.useMutation({
    onSuccess: () => {
      console.log("DeleteUpvote Success");
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
    deleteUpvoteFromUser,
    isDeletingUpvote,
    upvoteDeleted,
    deleteUpvoteError,
  };
};

export default useDeleteUpvoteFromUser;
