import { type MouseEvent } from "react";
import Image from "next/image";
import { type RouterOutputs, api } from "~/utils/api";
import toast from "react-hot-toast";

import { LoadingSpinner } from "src/components";
import { ThumbsUpIcon } from "public/icons";

type Attraction = RouterOutputs["attractions"]["getAll"][0];

interface GridElementProps {
  attraction: Attraction;
  userHasUpvotedAttraction: boolean;
}

const GridElement = ({
  attraction,
  userHasUpvotedAttraction,
}: GridElementProps) => {
  const ctx = api.useContext();

  console.log("GridElement attraction", attraction);

  const { mutate, isLoading: isUpvoting } = api.upvotes.create.useMutation({
    onSuccess: () => {
      void ctx.upvotes.getAll.invalidate();
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      if (errorMessage?.[0]) {
        toast.error(errorMessage[0]);
      } else {
        toast.error("Failed to upvote! Please try again later.");
      }
    },
  });

  const upvoteHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    mutate({
      attractionId: "cll4b5ois0000z4ka8u0wdhdi",
      userId: "fake Id from upvoteHandler",
    });
  };

  return (
    <li
      key={attraction.id}
      className="relative w-full border-2 border-blue-400"
    >
      <div className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
        <Image
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          src={attraction.imageURL}
          alt=""
          className="pointer-events-none object-cover group-hover:opacity-75"
          width={100}
          height={100}
          unoptimized
        />
      </div>
      <p className="pointer-events-none mt-2 block truncate text-center text-sm font-medium text-gray-900">
        {attraction.name}
      </p>

      {/* Upvotes */}
      <button
        className="inline-flex items-center rounded-md bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600  disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none"
        onClick={upvoteHandler}
        disabled={isUpvoting}
      >
        {isUpvoting ? (
          <LoadingSpinner />
        ) : (
          <ThumbsUpIcon enabled={userHasUpvotedAttraction} />
        )}
        <span
          className={`mx-1 ${userHasUpvotedAttraction ? "text-green-500" : ""}`}
        >
          {attraction?.upvotes.length ?? 0}
        </span>
      </button>
    </li>
  );
};

export default GridElement;
