import Image from "next/image";
import { useEffect, useState, type MouseEvent } from "react";
import toast from "react-hot-toast";

import { Star } from "lucide-react";
import { HeartIcon, StarIcon, ThumbsUpIcon } from "public/icons";
import { LoadingSpinner } from "~/components/loading";
import { api, type RouterOutputs } from "~/utils/api";

type Attraction = RouterOutputs["attractions"]["getAll"][0];

interface GridElementProps {
  attraction: Attraction;
  cityName: string;
  userHasUpvotedAttraction: boolean;
}

const GridElement = ({
  attraction,
  cityName,
  userHasUpvotedAttraction,
}: GridElementProps) => {
  const ctx = api.useContext();
  const [upvotes, setUpvotes] = useState(attraction.upvotes.length + 5 || 0);
  const [attractionUpvoted, setAttractionUpvoted] = useState(
    userHasUpvotedAttraction
  );

  useEffect(() => {
    setAttractionUpvoted(userHasUpvotedAttraction);
  }, [userHasUpvotedAttraction]);

  const { mutate, isLoading: isUpvoting } = api.upvotes.create.useMutation({
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
  const { mutate: mutateDelete, isLoading: isDeletingUpvote } =
    api.upvotes.delete.useMutation({
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

    // If the user has already upvoted, remove their update
    if (attractionUpvoted) mutateDelete({ attractionId: attraction.id });
    else mutate({ attractionId: attraction.id });
  };

  return (
    <div className="max-w-sm overflow-hidden rounded shadow-lg">
      {/* Attraction Name */}
      {/* <p className="flex h-14 items-center justify-center border border-red-500 text-center text-2xl font-bold">
        {attraction.name}
      </p> */}

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
        <div className="absolute top-0 flex justify-end border-2 border-blue-400">
          <button
            className="flex h-8 w-16 items-center justify-center rounded-md hover:bg-gray-200"
            onClick={upvoteHandler}
          >
            {/* <ThumbsUpIcon enabled={attractionUpvoted} /> */}
            <HeartIcon enabled={attractionUpvoted} />
          </button>
        </div>
      </div>

      {/* Description */}
      <div className="px-6 py-4">
        <div className="mb-2 text-xl font-bold">{attraction.name}</div>
        <div className="mb-2 flex items-center justify-between">
          {/* <p className=" text-xl font-bold">{attraction.name}</p> */}

          <button
            className="flex h-8 w-24 items-center justify-center rounded-md hover:bg-gray-200"
            onClick={upvoteHandler}
          >
            <StarIcon enabled={attractionUpvoted} />
            <HeartIcon enabled={attractionUpvoted} />
            <span
              className={`mx-1 ${attractionUpvoted ? "text-green-500" : ""}`}
            >
              {upvotes}
            </span>
          </button>
        </div>

        {/* Description */}
        <div>
          <p className="line-clamp-3 h-20 py-2 text-base text-gray-700">
            {attraction.description}
          </p>
        </div>
      </div>

      {/* Button */}
      {/* <div className="flex justify-start">
        <button
          className="inline-flex w-16 items-center justify-center rounded-md  bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-sm"
          onClick={upvoteHandler}
          disabled={isUpvoting}
        >
          {isUpvoting || isDeletingUpvote ? (
            <LoadingSpinner />
            ) : (
              <ThumbsUpIcon enabled={attractionUpvoted} />
            )}
          <ThumbsUpIcon enabled={attractionUpvoted} />

          <span className={`mx-2 ${attractionUpvoted ? "text-green-500" : ""}`}>
            {upvotes}
          </span>
        </button>
      </div> */}

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
    </div>
  );
};

export default GridElement;
