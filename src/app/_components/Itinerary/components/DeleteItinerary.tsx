"use client";
import { SignedIn, useUser } from "@clerk/nextjs";
import { useState } from "react";

import { DeleteItineraryModal } from "@/modals";
import { type ItineraryWithCityInfoType } from "~/types/router";
import { useDeleteItinerary } from "~/utils/hooks";

interface DeleteItineraryProps {
  data: ItineraryWithCityInfoType;
}

const DeleteItinerary = ({ data }: DeleteItineraryProps) => {
  const { user } = useUser();
  const { isDeletingItinerary } = useDeleteItinerary();
  const [openModal, setOpenModal] = useState(false);
  const userId = user?.id;
  const { id: itineraryID, userId: itineraryUserId } = data;

  return (
    // User can only delete itinerary if they are the current user
    <>
      <SignedIn>
        {userId === itineraryUserId && (
          <div className="mt-4">
            <button
              className={`rounded bg-red-600 px-4 py-1 text-white hover:bg-red-700 ${
                isDeletingItinerary && "cursor-not-allowed opacity-50"
              }`}
              onClick={() => setOpenModal(true)}
              disabled={isDeletingItinerary}
            >
              Delete Itinerary
            </button>
          </div>
        )}
      </SignedIn>

      {/* Modal */}
      <DeleteItineraryModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        itineraryID={itineraryID}
      />
    </>
  );
};

export default DeleteItinerary;
