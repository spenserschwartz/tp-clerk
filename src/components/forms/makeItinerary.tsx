import React, { useState } from "react";
import toast from "react-hot-toast";
import { api } from "~/utils/api";
import { LoadingSpinner } from "../loading";

interface MakeItineraryFormProps {
  onFormCancel?: () => void;
  onFormSubmit?: () => void;
}

const MakeItineraryForm = ({
  onFormCancel,
  onFormSubmit,
}: MakeItineraryFormProps) => {
  const ctx = api.useContext();

  const { data, isLoading } = api.upvotes.getAllByUserInCity.useQuery({
    cityId: "cll5m4ihx0000z4mruvrk2hi4",
    userId: "user_2T2MppjE6PnFtHWN32Td3co50J9",
  });

  const attractionNames: string[] | undefined = data?.map(
    (upvote) => upvote.attraction.name
  );

  console.log("attractionNames", attractionNames);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Submitted");
  };

  return (
    <div>
      <form className="mt-2" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Make an Itinerary
        </h2>
        <label className="block text-sm font-medium leading-6 text-gray-900">
          Here are the attractions to include:
        </label>

        {attractionNames?.map((attractionName) => (
          <div key={attractionName}>{attractionName}</div>
        ))}

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            onClick={onFormCancel}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default MakeItineraryForm;
