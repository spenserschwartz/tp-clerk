import { toast } from "react-hot-toast";
import { api } from "~/utils/api";

const useRemoveLikeFromUser = () => {
  const {
    mutate: removeLikeFromUser,
    isLoading: isRemovingLike,
    isSuccess: likeRemoved,
    isError: removeLikeError,
  } = api.likes.delete.useMutation({
    onSuccess: () => {
      console.log("Like Success");
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      if (errorMessage?.[0]) {
        toast.error(errorMessage[0]);
      } else {
        toast.error("Failed to like! Please try again later.");
      }
    },
  });

  return {
    removeLikeFromUser,
    isRemovingLike,
    likeRemoved,
    removeLikeError,
  };
};

export default useRemoveLikeFromUser;
