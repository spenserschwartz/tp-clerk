import { useUser } from "@clerk/nextjs";
import { useMemo, useState } from "react";
import { api } from "~/utils/api";

import { LoginModal } from "~/components/modal";
import type { PlaceNew } from "~/types/google";
import TableRow from "./components";

interface TableProps {
  cityId: string;
  places: PlaceNew[] | undefined;
}

export default function Table({ cityId, places }: TableProps) {
  const { isSignedIn } = useUser();
  const [openModal, setOpenModal] = useState(false);
  const { data: allLikesByUserInCity } = api.likes.getAllByUserInCity.useQuery({
    cityId: cityId ?? "",
  });

  // Create a set of all the places the user has liked, useMemo to avoid re-creating the set on every render
  const likedPlacesSet = useMemo(() => {
    return new Set(allLikesByUserInCity?.map((like) => like.placeId));
  }, [allLikesByUserInCity]);

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
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell"
                  >
                    Description
                  </th>

                  <th scope="col" className="relative py-3.5">
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
