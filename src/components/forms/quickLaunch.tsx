import React, { useState } from "react";

interface QuickLaunchFormProps {
  cityNames: string[] | undefined;
}

const QuickLaunchForm = ({ cityNames }: QuickLaunchFormProps) => {
  const [numberOfDays, setNumberOfDays] = useState("");
  if (!cityNames?.length) return <div>No city names found</div>;

  const handleNumberOfDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (isNaN(Number(e.target.value))) return;
    else setNumberOfDays(e.target.value);
  };

  return (
    <div className="mx-auto w-full md:w-96 md:max-w-full">
      <div className="border border-gray-600  bg-gray-800 p-6 sm:rounded-md">
        <form>
          <label className="mb-6 block">
            <span className="text-gray-300">Where do you want to go?</span>
            <select
              name="present"
              className="mt-1 w-full rounded-md border-gray-600 bg-transparent text-gray-300 placeholder-gray-600 shadow-sm selection:block focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              {/* Map out cityNames */}
              {cityNames.map((cityName) => (
                <option key={`QuickLaunchOption:${cityName}`}>
                  {cityName}
                </option>
              ))}
            </select>
          </label>

          <label className="mb-6 block">
            <span className="text-gray-300">When do you want to start?</span>
            <input
              name="birthday"
              type="date"
              className="mt-1 w-full rounded-md border-gray-600 bg-transparent text-gray-300 placeholder-gray-600 shadow-sm selection:block focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>

          <label className="mb-6 block">
            <span className="text-gray-300">How long will you be there?</span>
            <input
              name="name"
              type="text"
              className="mt-1 w-full rounded-md border-gray-600 bg-transparent text-gray-300 placeholder-gray-600 shadow-sm selection:block focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="# of days"
              value={numberOfDays}
              onChange={handleNumberOfDaysChange}
            />
          </label>

          <div>
            <label className="">
              <input
                name="season"
                type="checkbox"
                className="rounded-full border-gray-600 bg-transparent  placeholder-gray-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 focus:ring-offset-0"
              />
              <span className="ml-2 text-gray-300">
                Add some extra adventure!
              </span>
            </label>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className="focus:shadow-outline h-10 rounded-lg bg-indigo-700 px-5 text-indigo-100 transition-colors duration-150 hover:bg-indigo-800"
            >
              Send Answers
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuickLaunchForm;
