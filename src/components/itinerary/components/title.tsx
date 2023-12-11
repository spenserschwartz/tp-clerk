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
    // <div className="mb-4 max-h-12 max-w-md  font-extrabold leading-none dark:text-white md:max-h-20 md:max-w-2xl">
    //   {isEditing && (
    //     <div className="h-full">
    //       <input
    // type="text"
    // value={text}
    // onChange={handleTextChange}
    // autoFocus
    // className="max-w-xl bg-transparent text-center text-4xl leading-none text-gray-900 focus:h-full focus:items-center focus:rounded-md focus:bg-gray-200 focus:tracking-tight focus:ring-0 dark:text-white md:text-5xl lg:text-6xl"
    // onBlur={handleBlur}
    // onKeyDown={handleKeyDown}
    //       />
    //     </div>
    //   )}

    //   {!isEditing && (
    //     <h1 className="relative flex h-full items-center px-9">
    //       <p className="truncate text-4xl md:text-5xl lg:text-6xl">{text}</p>
    //       {/* Pencil icon */}
    //       <div className="absolute right-0 flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 text-4xl tracking-tight text-gray-900 opacity-50 hover:bg-gray-500 hover:text-gray-900 md:top-0 md:text-5xl lg:text-6xl">
    //         <PencilIcon
    //           className="h-5 w-5"
    //           aria-hidden="true"
    //           onClick={() => setEditing(true)}
    //         />
    //       </div>
    //     </h1>
    //   )}
    // </div>

    <>
      {/* <div className="mb-4 h-20 w-64 border border-red-500 text-xl">
        {isEditing && (
          <div className="">
            <input
              type="text"
              value={text}
              onChange={handleTextChange}
              autoFocus
              className="focus: w-full text-xl focus:h-20 focus:p-0"
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
            />
          </div>
        )}

        {!isEditing && (
          <h1 className="flex h-full items-center border border-green-400">
            {text}
          </h1>
        )}
      </div>
      <button
        className="rounded-sm bg-slate-400"
        onClick={() => setEditing(!isEditing)}
      >
        EDIT
      </button> */}
      {/* <div className="h-20 border border-red-500 text-xl">
        <input
          type="text"
          value={text}
          onChange={handleTextChange}
          autoFocus
          className="h-full truncate"
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
      </div> */}
      <div className="group relative inline-flex w-full max-w-4xl items-center justify-center border border-red-400">
        <input
          type="text"
          value={text}
          onChange={handleTextChange}
          className="w-full truncate rounded-full border  border-gray-300 px-8 py-2 text-center text-4xl transition duration-150 ease-in-out focus:w-auto focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <PencilIcon className="pointer-events-none invisible absolute right-3 h-5 w-5 text-gray-500 group-hover:visible" />
      </div>
    </>
  );
};

export default ItineraryTitle;
