import { toast } from "react-hot-toast";
import { api } from "~/utils/api";

const useAddLikeFromUser = () => {
  const {
    mutate: addLikeFromUser,
    isLoading: isAddingLike,
    isSuccess: likeSuccess,
    data: likeData,
    isError: likeError,
  } = api.likes.create.useMutation({
    onSuccess: () => {
      toast.success("Liked!");
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      if (errorMessage?.[0]) {
        toast.error(errorMessage[0]);
      } else {
        toast.error("Failed to like! Please try again later.");
      }
    },
    onSettled(_, error) {
      if (error) console.error(error);
    },
  });

  return {
    addLikeFromUser,
    isAddingLike,
    likeSuccess,
    likeData,
    likeError,
  };
};

export default useAddLikeFromUser;
