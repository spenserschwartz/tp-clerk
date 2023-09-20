import React, { useState } from "react";

const VisitedCityForm = () => {
  const [recDaysInput, setRecDaysInput] = useState("");

  const handleRecDaysInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    // Check if input is a number
    if (isNaN(Number(rawValue))) return;
    else setRecDaysInput(rawValue);
  };

  return (
    <form className="mt-2">
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
  );
};

export default VisitedCityForm;
