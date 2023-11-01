import { usePathname } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { api, type RouterOutputs } from "~/utils/api";
import { displayCityName } from "~/utils/common";
import { LoadingSpinner } from "../loading";

type GetCityByNameType = RouterOutputs["city"]["getCityByName"];

interface VisitedCityFormProps {
  cityData?: GetCityByNameType;
  onFormCancel: () => void;
  onFormSubmit: () => void;
}

const VisitedCityForm = ({
  cityData,
  onFormCancel,
  onFormSubmit,
}: VisitedCityFormProps) => {
  const ctx = api.useContext();
  const [recDaysInput, setRecDaysInput] = useState("");
  const pathname = usePathname(); // Get the current pathname to find the city name
  const cityName = displayCityName(pathname?.split("/")[2]); // Get the city name from the pathname

  // Upsert a new recommendation
  const { mutate, isLoading: creatingRec } =
    api.recommendedDaysInCity.upsert.useMutation({
      onSuccess: () => {
        void ctx.recommendedDaysInCity.getAllByCity.invalidate();
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
  const { data: userRecommendationData, isLoading: userRecIsLoading } =
    api.recommendedDaysInCity.getUserRecommendation.useQuery({
      cityName: cityName ?? "",
    });
  const recommendedDays = userRecommendationData?.recommendedDays ?? undefined;

  const handleRecDaysInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue: string = e.target.value; // rawValue is string because input type is text
    // Check if input is a number
    if (isNaN(Number(rawValue))) return;
    else setRecDaysInput(rawValue);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent the browser from reloading the page
    e.preventDefault();

    if (!recDaysInput) return;
    mutate({
      // cityId: "cll5m4ihx0000z4mruvrk2hi4",
      cityId: cityData?.id ?? "",
      id: userRecommendationData?.id ?? "",
      recommendedDays: Number(recDaysInput),
    });
  };

  return (
    <div>
      {creatingRec || userRecIsLoading ? (
        <div className="flex justify-center">
          <LoadingSpinner size={64} />
        </div>
      ) : (
        <form className="mt-2" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Visited City
          </h2>
          <div>
            <label
              htmlFor="website"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              How many days should travelers spend here?
            </label>

            {/* Previous Recommendation */}
            <p className="text-xs text-slate-500">
              {recommendedDays
                ? `You previously recommended ${recommendedDays} ${
                    recommendedDays === 1 ? "day" : "days"
                  }`
                : null}
            </p>
            <input
              type="text"
              name="numberOfRecDays"
              id="numberOfRecDays"
              className="my-2 block w-full rounded-md border-0 pb-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Enter a number"
              value={recDaysInput}
              onChange={handleRecDaysInput}
            />
          </div>
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
      )}
    </div>
  );
};

export default VisitedCityForm;
