"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState, type MouseEvent } from "react";

import { HeartIcon } from "@/icons";
import { LoginModal } from "@/modals";
import { api } from "~/trpc/react";
import { type AttractionByNameType } from "~/types/router";
import { useAddUpvoteFromUser, useDeleteUpvoteFromUser } from "~/utils/hooks";

interface PlaceTitleProps {
  data: AttractionByNameType;
}

const PlacesProfileTitle = ({ data }: PlaceTitleProps) => {
  const { user, isSignedIn } = useUser();
  const { name, id } = data ?? {};
  const { deleteUpvoteFromUser, deleteUpvoteError } = useDeleteUpvoteFromUser();
  const { upvoteAttraction, upvoteError } = useAddUpvoteFromUser();
  const [userUpvoted, setUserUpvoted] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { data: placeData } = api.upvotes.getByUserAndId.useQuery({
    attractionId: id ?? "",
    userId: user ? user.id : "",
  });

  // Check if user has upvoted this place from the server
  useEffect(() => {
    if (placeData) setUserUpvoted(true);
  }, [placeData]);

  // Remedy optimistic updates on error
  useEffect(() => {
    if (deleteUpvoteError) setUserUpvoted(true);
    else if (upvoteError) setUserUpvoted(false);
  }, [deleteUpvoteError, upvoteError]);

  const handleUpvote = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isSignedIn) return setOpenModal(true);
    else {
      if (userUpvoted) {
        setUserUpvoted(false); // optimistic update
        deleteUpvoteFromUser({ attractionId: id ?? "" });
      } else {
        setUserUpvoted(true); // optimistic update
        upvoteAttraction({ attractionId: id ?? "" });
      }
    }
  };

  return (
    <div className="mt-2 flex w-full md:flex md:items-center md:justify-between">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          {name}
        </h2>
      </div>
      <div className="mt-4 flex flex-shrink-0 md:ml-4 md:mt-0">
        <button onClick={handleUpvote}>
          <HeartIcon enabled={userUpvoted} />
        </button>
      </div>

      {/* Log In Modal */}
      <LoginModal openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
};

export default PlacesProfileTitle;
