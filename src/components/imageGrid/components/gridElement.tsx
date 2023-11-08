import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useEffect, useState, type MouseEvent } from "react";
import toast from "react-hot-toast";
import { api } from "~/utils/api";

import { HeartIcon } from "public/icons";
import { Modal } from "~/components";
import { type AttractionType } from "~/types/router";

interface GridElementProps {
  attraction: AttractionType;
  cityName: string;
  userHasUpvotedAttraction: boolean;
}

const GridElement = ({
  attraction,
  cityName,
  userHasUpvotedAttraction,
}: GridElementProps) => {
  const { isSignedIn } = useUser();
  const ctx = api.useContext();
  const [upvotes, setUpvotes] = useState(attraction.upvotes.length + 5 || 0); // +5 can be removed once we have enough real data
  const [attractionUpvoted, setAttractionUpvoted] = useState(
    userHasUpvotedAttraction
  );
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setAttractionUpvoted(userHasUpvotedAttraction);
  }, [userHasUpvotedAttraction]);

  const { mutate } = api.upvotes.create.useMutation({
    onSuccess: () => void ctx.upvotes.getAll.invalidate(),
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      if (errorMessage?.[0]) {
        toast.error(errorMessage[0]);
      } else {
        toast.error("Failed to upvote! Please try again later.");
      }

      // Reset optimistic update on error
      setUpvotes(upvotes - 1);
      setAttractionUpvoted(false);
    },
    onMutate: () => {
      // Optimistic update
      setUpvotes(upvotes + 1);
      setAttractionUpvoted(true);
    },
  });
  const { mutate: mutateDelete } = api.upvotes.delete.useMutation({
    onSuccess: () => void ctx.upvotes.getAll.invalidate(),
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      if (errorMessage?.[0]) {
        toast.error(errorMessage[0]);
      } else {
        toast.error("Failed to upvote! Please try again later.");
      }

      // Reset optimistic update on error
      setUpvotes(upvotes + 1);
      setAttractionUpvoted(true);
    },

    onMutate: () => {
      // Optimistic Update
      setUpvotes(upvotes - 1);
      setAttractionUpvoted(false);
    },
  });

  const upvoteHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!isSignedIn) return setOpenModal(true);
    else {
      // If the user has already upvoted, remove their update
      if (attractionUpvoted) mutateDelete({ attractionId: attraction.id });
      else mutate({ attractionId: attraction.id });
    }
  };

  return (
    <div
      className="max-w-sm overflow-hidden rounded shadow-lg"
      data-aos="fade-up"
    >
      {/* Image */}
      <div className="group aspect-h-7 aspect-w-10 relative block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
        <Image
          src={attraction.imageURL || "/images/placeholder.png"}
          alt=""
          className="pointer-events-none object-cover"
          width={100}
          height={100}
          priority
          unoptimized
        />

        {/* Overlay for icon in top right */}
        <div className="absolute top-0 flex items-start justify-end">
          <button onClick={upvoteHandler}>
            <HeartIcon enabled={attractionUpvoted} />
          </button>
        </div>
      </div>

      {/* Details */}
      <div className="px-4 py-2">
        {/* Attraction Name */}
        <div className="flex h-14 items-center justify-center text-center text-xl font-bold">
          {attraction.name}
        </div>

        {/* Description */}
        <div>
          <p className="line-clamp-3 h-20  py-2 text-base text-gray-700">
            {attraction.description}
          </p>
        </div>
      </div>

      {/* Tags */}
      <div className="px-6 pb-2 pt-4">
        <span className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
          #travel
        </span>
        <span className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
          #attraction
        </span>
        <span className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
          #{cityName}
        </span>
      </div>

      {/* Log In Modal */}
      <Modal
        content="LoginModal"
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </div>
  );
};

export default GridElement;
