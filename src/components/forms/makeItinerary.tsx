import React, { useState } from "react";
import toast from "react-hot-toast";
import { api } from "~/utils/api";
import { LoadingSpinner } from "../loading";

interface MakeItineraryFormProps {
  onFormCancel: () => void;
  onFormSubmit: () => void;
}

const MakeItineraryForm = ({
  onFormCancel,
  onFormSubmit,
}: MakeItineraryFormProps) => {
  const ctx = api.useContext();
  const [recDaysInput, setRecDaysInput] = useState("");

  // !Upsert a new recommendation
  const { mutate, isLoading: creatingRec } =
    api.recommendedDaysInCity.upsert.useMutation({
      onSuccess: () => {
        void ctx.recommendedDaysInCity.getAll.invalidate();
        toast.success("Your recommendation has been logged!");
      },
      onError: (e) => {
        const errorMessage = e.data?.zodError?.fieldErrors.content;
        if (errorMessage?.[0]) {
          toast.error(errorMessage[0]);
        } else {
          toast.error(
            "Failed to log your recommendation! Please try again later."
          );
        }
      },
      onSettled: () => onFormSubmit(),
    });

  // Get the user's previous recommendation
  //   const { data: userRecommendationData, isLoading: userRecIsLoading } =
  //     api.recommendedDaysInCity.getUserRecommendation.useQuery({
  //       cityName: "London",
  //     });
  //   const recommendedDays = userRecommendationData?.recommendedDays ?? undefined;

  const { data, isLoading } = api.upvotes.getAllByUserInCity.useQuery({
    cityId: "cll5m4ihx0000z4mruvrk2hi4",
    userId: "user_2T2MppjE6PnFtHWN32Td3co50J9",
  });

  console.log("DATA", data);

  const handleRecDaysInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue: string = e.target.value; // rawValue is string because input type is text
    // Check if input is a number
    if (isNaN(Number(rawValue))) return;
    else setRecDaysInput(rawValue);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent the browser from reloading the page
    e.preventDefault();
  };

  return <div>MakeItinerary</div>;
};

export default MakeItineraryForm;
