import { PencilIcon } from "@heroicons/react/20/solid";
import React, { useState } from "react";
import { api } from "~/utils/api";

import { type ItineraryWithCityInfoType } from "~/types/router";

interface ItineraryTitleProps {
  itineraryID: string;
}

const ItineraryTitle = ({ itineraryID }: ItineraryTitleProps) => {
  const { data } = api.itinerary.getByID.useQuery({ id: itineraryID });
  const [isEditing, setEditing] = useState(false);
  const [text, setText] = useState<string>("first title"); // Assuming the title is coming from the data

  const { title, details } = data as ItineraryWithCityInfoType;

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleBlur = () => {
    setEditing(false);
    // Call API to update the title here if needed
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setEditing(false);
      // Call API to update the title here if needed
    }
  };

  return (
    <div className="h-20 max-w-xl items-center border border-green-400 py-2 text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
      {isEditing && (
        <div className="h-full border border-red-400 ">
          <input
            type="text"
            value={text}
            onChange={handleTextChange}
            autoFocus
            className="w-full border-none border-purple-600 bg-transparent text-center text-4xl leading-none focus:h-full focus:items-center focus:tracking-tight focus:ring-0 dark:text-white md:text-5xl lg:text-6xl"
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
          />
        </div>
      )}

      {!isEditing && (
        <h1 className="relative w-full max-w-xl border border-blue-400 px-9 hover:bg-gray-300">
          <p className="truncate md:text-5xl lg:text-6xl">{text}</p>
          {/* Pencil icon */}
          <div className="absolute right-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 text-gray-700 opacity-50 hover:bg-gray-500 hover:text-gray-900">
            <PencilIcon
              className="h-5 w-5"
              aria-hidden="true"
              onClick={() => setEditing(true)}
            />
          </div>
        </h1>
      )}
    </div>
  );
};

export default ItineraryTitle;
