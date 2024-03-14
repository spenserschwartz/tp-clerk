import { useEffect, useState, type MouseEvent } from "react";

import { HeartIcon } from "~/icons";
import type { PlaceNew } from "~/types/google";
import { api } from "~/utils/api";
import { useAddLikeFromUser, useRemoveLikeFromUser } from "~/utils/hooks";

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
  const { addLikeFromUser, isAddingLike, likeData, isLikeError } =
    useAddLikeFromUser();
  const { isRemovingLike, likeRemoved, removeLikeError, removeLikeFromUser } =
    useRemoveLikeFromUser();

  const handleLike = (e: MouseEvent<HTMLButtonElement>) => {
    if (!isSignedIn) return setOpenModal(true);
    else {
      // If the user has already liked, remove their update. Else, add their like
      if (likedPlace) {
        setLikedPlace(false);
        removeLikeFromUser({
          cityId,
          placeId: place.id,
        });
      } else {
        setLikedPlace(true);
        addLikeFromUser({
          cityId,
          placeId: place.id,
        });
      }
    }
  };

  useEffect(() => {
    if (isLikeError) setLikedPlace(false);
  }, [isLikeError]);

  return (
    <tr key={place.id}>
      {/* Adjusted cells for ellipsis */}
      <td
        className="w-1/3 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
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
