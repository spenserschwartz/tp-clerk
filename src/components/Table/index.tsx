import { useUser } from "@clerk/nextjs";
import { useEffect, useMemo, useState } from "react";
import { api } from "~/utils/api";

import { add } from "date-fns";
import { LoginModal } from "~/components/modal";
import { HeartIcon } from "~/icons";
import type { PlaceNew } from "~/types/google";
import { useAddLikeFromUser, useRemoveLikeFromUser } from "~/utils/hooks";
import TableRow from "./components";

interface TableProps {
  cityId: string;
  places: PlaceNew[] | undefined;
}

// TODO: Pass in if user has liked that attraction yet

export default function Table({ cityId, places }: TableProps) {
  const { isSignedIn, user } = useUser();
  const [error, setError] = useState(null);
  const { addLikeFromUser, isAddingLike, likeData, likeError } =
    useAddLikeFromUser({
      onSuccess: (data) => {
        console.log("Like added successfully!", data);
        // Additional success logic here
      },
      onError: (error) => {
        console.log("Failed to add like", error);
        setError(error);
        // Additional error handling here
      },
    });

  console.log("table user", user);
  const { isRemovingLike, likeRemoved, removeLikeError, removeLikeFromUser } =
    useRemoveLikeFromUser();
  const [openModal, setOpenModal] = useState(false);

  const { data: allLikesByUserInCity } = api.likes.getAllByUserInCity.useQuery({
    cityId: cityId ?? "",
  });

  useEffect(() => {
    console.log("ue error", error);
  }, [error]);

  // Create a set of all the places the user has liked, useMemo to avoid re-creating the set on every render
  const likedPlacesSet = useMemo(() => {
    return new Set(allLikesByUserInCity?.map((like) => like.placeId));
  }, [allLikesByUserInCity]);

  console.log("allLikesByUserInCity", allLikesByUserInCity);
  console.log("likedPlacesSet", likedPlacesSet);

  console.log("places", places);
  console.log("cityid", cityId);

  useEffect(() => {
    console.log("likeError", likeError);
  }, [likeError]);

  const handleLike = (placeId: string) => {
    if (!isSignedIn) return setOpenModal(true);
    else {
      // If the user has already liked, remove their update. Else, add their like
      if (likedPlacesSet.has(placeId)) {
        removeLikeFromUser({ cityId, placeId });
      } else {
        addLikeFromUser({ placeId });
      }
    }
  };

  if (!places) return null;
  return (
    <div className="mt-8 flow-root w-full max-w-6xl">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="border border-red-500 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className=" border border-green-500 px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Description
                  </th>

                  <th
                    scope="col"
                    className="relative border border-blue-400 py-3.5"
                  >
                    <span className="sr-only">Like Button</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {places.map((place) => (
                  <TableRow
                    key={place.id}
                    cityId={cityId}
                    isSignedIn={isSignedIn ?? false}
                    place={place}
                    setOpenModal={setOpenModal}
                    userHasLikedPlace={likedPlacesSet.has(place.id)}
                  />
                  // <tr key={place.id}>
                  //   {/* Adjusted cells for ellipsis */}
                  //   <td
                  //     className="w-1/3 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                  //     style={{
                  //       minWidth: "100px",
                  //       maxWidth: "200px",
                  //       overflow: "hidden",
                  //       textOverflow: "ellipsis",
                  //       whiteSpace: "nowrap",
                  //     }}
                  //   >
                  //     {place.displayName?.text}
                  //   </td>

                  //   <td
                  //     className="hidden px-3 py-4 text-sm text-gray-500 md:table-cell"
                  //     style={{
                  //       minWidth: "100px",
                  //       maxWidth: "300px",
                  //       overflow: "hidden",
                  //       textOverflow: "ellipsis",
                  //       whiteSpace: "nowrap",
                  //     }}
                  //   >
                  //     {place.editorialSummary?.text}
                  //   </td>
                  //   <td className="relative py-4 text-right text-sm font-medium ">
                  //     <button
                  //       className="flex items-center justify-center"
                  //       onClick={() => handleLike(place.id)}
                  //     >
                  //       <HeartIcon enabled={likedPlacesSet.has(place.id)} />
                  //       <span className="sr-only">
                  //         Like Button for {place.displayName?.text}
                  //       </span>
                  //     </button>
                  //   </td>
                  // </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Log In Modal */}
      <LoginModal openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
}
