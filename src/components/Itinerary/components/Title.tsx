import { PencilIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
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
  const { editItineraryTitle, isEditingItineraryTitle } =
    useEditItineraryTitle();
  const { length: numberOfDays } = details as unknown as { length: number };

  const [currentTitle, setCurrentTitle] = useState<string>(
    title ?? `${numberOfDays} days in ${cityName}`
  );
  const [inputText, setInputText] = useState<string>(
    title ?? `${numberOfDays} days in ${cityName}`
  );

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  // Update itineraryTitle (on blur or on enter) if inputText has changed
  const handleBlur = () => {
    if (inputText !== currentTitle) {
      setCurrentTitle(inputText);
      editItineraryTitle({ id: itineraryID, title: inputText });
    }
  };

  // Go to blur logic on enter key
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const target = event.target as HTMLInputElement;
      target.blur();
    }
  };

  return (
    <div className="group relative mb-2 inline-flex w-full max-w-4xl items-center justify-center">
      <input
        type="text"
        value={inputText}
        onChange={handleTextChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className="w-full truncate rounded-full border-0 p-0 text-center text-3xl font-extrabold outline-none transition duration-150 ease-in-out hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:ring-0 md:px-8 md:text-5xl lg:text-6xl"
        disabled={isEditingItineraryTitle}
      />
      <PencilIcon className="pointer-events-none invisible absolute right-3 h-5 w-5 text-gray-500 md:group-hover:visible" />
    </div>
  );
};

export default ItineraryTitle;
