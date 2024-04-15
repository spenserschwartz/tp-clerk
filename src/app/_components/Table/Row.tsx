"use client";
import { useState, type MouseEvent } from "react";
import toast from "react-hot-toast";

import { HeartIcon } from "@/icons";
import { api } from "~/trpc/react";
import type { PlaceNew } from "~/types/google";

interface TableRowProps {
  cityId: string;
  isSignedIn: boolean;
  place: PlaceNew;
  setOpenModal: (open: boolean) => void;
  userHasLikedPlace: boolean;
}

const TableRow = ({
  cityId,
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
      else addLike({ cityId, placeId: place.id });
    }
  };

  return (
    <tr key={place.id}>
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
      <td className="relative py-4 text-right text-sm font-medium ">
        <button
          className="flex items-center justify-center"
          onClick={handleLike}
        >
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
