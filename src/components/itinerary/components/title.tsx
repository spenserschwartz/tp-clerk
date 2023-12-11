import { PencilIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useRef, useState } from "react";
import { api } from "~/utils/api";

import { type ItineraryWithCityInfoType } from "~/types/router";
import { useEditItineraryTitle } from "~/utils/hooks";

interface ItineraryTitleProps {
  itineraryID: string;
}

const ItineraryTitle = ({ itineraryID }: ItineraryTitleProps) => {
  const { data } = api.itinerary.getByID.useQuery({ id: itineraryID });
  const {
    title,
    details,
    city: { name: cityName },
  } = data as ItineraryWithCityInfoType;
  const { editItineraryTitle, isEditingItineraryTitle, itineraryTitleEdited } =
    useEditItineraryTitle();
  const { length: numberOfDays } = details as unknown as { length: number };
  const [isEditing, setEditing] = useState(false);

  const [text, setText] = useState<string>(
    title ?? `${numberOfDays} days in ${cityName}`
  );
  const span = useRef();

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
      editItineraryTitle({ id: itineraryID, title: text });
    }
  };

  return (
    <div className="group relative mb-2 inline-flex w-full max-w-4xl items-center justify-center">
      <input
        type="text"
        value={text}
        onChange={handleTextChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className="w-full truncate rounded-full border-0 p-0 px-8 text-center text-4xl font-extrabold outline-none transition duration-150 ease-in-out hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:ring-0 md:text-5xl lg:text-6xl"
      />
      <PencilIcon className="pointer-events-none invisible absolute right-3 h-5 w-5 text-gray-500 group-hover:visible" />
    </div>
  );
};

export default ItineraryTitle;
