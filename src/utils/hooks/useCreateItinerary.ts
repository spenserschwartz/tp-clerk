// hooks/useCreateItinerary.ts
import { toast } from "react-hot-toast";
import { api } from "~/utils/api";

const useCreateItinerary = () => {
  const { mutate: createItinerary, isLoading: isCreatingItinerary } =
    api.itinerary.create.useMutation({
      onSuccess: () => {
        console.log("CreateItinerary Success");
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
        console.log("itinerary onSettled data", data);
      },
    });

  return { createItinerary, isCreatingItinerary };
};

export default useCreateItinerary;

// const { mutate: createItinerary, isLoading: isCreatingItinerary } =
//   api.itinerary.create.useMutation({
//     onSuccess: () => {
//       console.log("CreateItinerary Success");
//     },
//     onError: (e) => {
//       const errorMessage = e.data?.zodError?.fieldErrors.content;
//       if (errorMessage?.[0]) {
//         toast.error(errorMessage[0]);
//       } else {
//         toast.error("Failed to create itinerary! Please try again later.");
//       }
//     },
//     onSettled(data, error) {
//       if (error) console.error(error);
//       console.log("itinerary onSettled data", data);
//     },
//   });
