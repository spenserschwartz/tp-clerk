import { toast } from "react-hot-toast";
import { api } from "~/utils/api";

const useAddUpvoteFromUser = () => {
  const {
    mutate: upvoteAttraction,
    isLoading: isUpvoting,
    isSuccess: upvoteSuccess,
    data: upvoteData,
  } = api.upvotes.create.useMutation({
    onSuccess: () => {
      toast.success("Upvoted!");
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      if (errorMessage?.[0]) {
        toast.error(errorMessage[0]);
      } else {
        toast.error("Failed to upvote! Please try again later.");
      }
    },
    onSettled(_, error) {
      if (error) console.error(error);
    },
  });

  return {
    upvoteAttraction,
    isUpvoting,
    upvoteSuccess,
    upvoteData,
  };
};

export default useAddUpvoteFromUser;
