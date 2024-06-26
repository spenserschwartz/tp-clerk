"use client";
import { useState, type MouseEvent } from "react";
import toast from "react-hot-toast";

import { HeartIcon } from "@/icons";
import { revalidateThingsToDoPage } from "~/server/actions";
import { api } from "~/trpc/react";
import type { PlaceNew } from "~/types/google";

interface TableRowProps {
  cityId: string;
  cityName: string;
  isSignedIn: boolean;
  place: PlaceNew;
  setOpenModal: (open: boolean) => void;
  userHasLikedPlace: boolean;
}

const TableRow = ({
  cityId,
  cityName,
  isSignedIn,
  place,
  setOpenModal,
  userHasLikedPlace,
}: TableRowProps) => {
  const [likedPlace, setLikedPlace] = useState(userHasLikedPlace);
  const { mutate: addLike } = api.likes.create.useMutation({
    onSuccess: () => {
      console.log("Liked!");
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      if (errorMessage?.[0]) {
        toast.error(errorMessage[0]);
      } else {
        toast.error("Failed to upvote! Please try again later.");
      }

      // Reset optimistic update on error
      setLikedPlace(false);
    },
    onMutate: () => setLikedPlace(true), // Optimistic update,
  });

  const { mutate: removeLike } = api.likes.delete.useMutation({
    onSuccess: () => {
      console.log("Like removed!");
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      if (errorMessage?.[0]) {
        toast.error(errorMessage[0]);
      } else {
        toast.error("Failed to remove like! Please try again later.");
      }

      // Reset optimistic update on error
      setLikedPlace(true);
    },
    onMutate: () => setLikedPlace(false), // Optimistic update,
  });

  const handleLike = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isSignedIn) return setOpenModal(true);
    else {
      // If the user has already liked, remove their update. Else, add their like
      if (likedPlace) removeLike({ cityId, placeId: place.id });
      else
        addLike({
          cityId,
          cityName,
          placeId: place.id,
          displayName: place.displayName?.text ?? "displayName not found",
        });
    }

    void revalidateThingsToDoPage();
  };

  const rowClick = (e: MouseEvent<HTMLTableRowElement>) => {
    e.preventDefault();
    window.open(place.websiteUri ?? place.googleMapsUri, "_blank");
  };

  return (
    <tr
      key={place.id}
      className=" hover:cursor-pointer hover:bg-gray-200 has-[.heart-icon:hover]:bg-transparent"
      onClick={rowClick}
    >
      {/* Adjusted cells for ellipsis */}
      <td
        className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 md:w-1/3"
        style={{
          minWidth: "100px",
          maxWidth: "200px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {place.displayName?.text}
      </td>

      <td
        className="hidden px-3 py-4 text-sm text-gray-500 md:table-cell"
        style={{
          minWidth: "100px",
          maxWidth: "300px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {place.editorialSummary?.text}
      </td>
      <td
        className="relative flex items-center justify-center py-4 text-right text-sm font-medium hover:cursor-default"
        onClick={(e) => e.stopPropagation()} // Prevents the click event from bubbling up to the row}
      >
        <button onClick={handleLike}>
          <HeartIcon enabled={likedPlace} />
          <span className="sr-only">
            Like Button for {place.displayName?.text}
          </span>
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
