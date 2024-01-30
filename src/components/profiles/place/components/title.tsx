import { useUser } from "@clerk/nextjs";
import { HeartIcon } from "public/icons";
import { useEffect, useState, type MouseEvent } from "react";
import { LoginModal } from "~/components/modal";
import { type AttractionByNameType } from "~/types/router";
import { api } from "~/utils/api";

interface PlaceTitleProps {
  data: AttractionByNameType;
}

const PlaceTitle = ({ data }: PlaceTitleProps) => {
  const { user, isSignedIn, isLoaded } = useUser();
  const { name, id } = data ?? {};

  const [hasUserUpvoted, setHasUserUpvoted] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { data: placeData } = api.upvotes.getByUserAndId.useQuery({
    attractionId: id ?? "",
    userId: user ? user.id : "",
  });

  console.log("userHasUpvoted", hasUserUpvoted);

  // Check if user has upvoted this place from the server
  useEffect(() => {
    if (placeData) setHasUserUpvoted(true);
  }, [placeData]);

  const handleUpvote = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isSignedIn) return setOpenModal(true);
    else {
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
          <HeartIcon enabled={hasUserUpvoted} />
        </button>
      </div>

      {/* Log In Modal */}
      <LoginModal openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
};

export default PlaceTitle;
