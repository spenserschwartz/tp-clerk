import { useUser } from "@clerk/nextjs";
import { Dialog } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type Dispatch } from "react";
import toast from "react-hot-toast";

import { revalidateThingsToDoPage } from "~/server/actions";
import { api } from "~/trpc/react";
import { useDeleteItinerary, useProgressRouter } from "~/utils/hooks";
import ModalWrapper from "./Wrapper";

interface DeleteItineraryModalProps {
  itineraryID: string;
  openModal: boolean;
  setOpenModal: Dispatch<boolean>;
}

const DeleteItineraryModal = ({
  itineraryID,
  openModal,
  setOpenModal,
}: DeleteItineraryModalProps) => {
  const router = useProgressRouter();
  const pathname = usePathname();
  const { user } = useUser();
  const ctx = api.useUtils();
  const cancelButtonRef = useRef(null);
  const [deleteCount, setDeleteCount] = useState(0);
  const { deleteItinerary, isDeletingItinerary, itineraryDeleted } =
    useDeleteItinerary();

  const deleteButtonHandler = () => {
    deleteItinerary({ id: itineraryID });
  };

  // When itineraryDeleted is true, show toast, redirect back to the previous page, close modal
  useEffect(() => {
    if (itineraryDeleted && deleteCount === 0) {
      setDeleteCount(1);
      const userId = user?.id ?? "";
      const lookingAtSingleItinerary = pathname.includes("itinerary");

      if (lookingAtSingleItinerary) {
        toast.success("Itinerary deleted. You will be redirected.");
        setTimeout(() => {
          void revalidateThingsToDoPage();
          void router.push(`/user/${userId}`);
        }, 3000);
      } else {
        toast.success("Itinerary deleted.");
        void revalidateThingsToDoPage();
      }

      setOpenModal(false);
    }
  }, [
    ctx.itinerary.getByUserId,
    deleteCount,
    itineraryDeleted,
    pathname,
    router,
    setOpenModal,
    user?.id,
  ]);

  return (
    <ModalWrapper openModal={openModal} setOpenModal={setOpenModal}>
      <div className="sm:flex sm:items-start">
        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <ExclamationTriangleIcon
            className="h-6 w-6 text-red-600"
            aria-hidden="true"
          />
        </div>
        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
          <Dialog.Title
            as="h3"
            className="text-base font-semibold leading-6 text-gray-900"
          >
            Delete Itinerary
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Are you sure you want to delete this itinerary? It will be
              permanently removed from our servers forever. This action cannot
              be undone.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50 sm:ml-3 sm:w-auto"
          disabled={isDeletingItinerary}
          onClick={deleteButtonHandler}
        >
          Delete
        </button>
        <button
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          onClick={() => setOpenModal(false)}
          ref={cancelButtonRef}
        >
          Cancel
        </button>
      </div>
    </ModalWrapper>
  );
};

export default DeleteItineraryModal;
