import type { ImageGridProps, UserUpvoteMemo } from "./types";
import GridElement from "./components/gridElement";

const ImageGrid = ({ cityData, userUpvoteData }: ImageGridProps) => {
  if (!cityData) return null;
  const { attractions } = cityData;

  console.log("ImageGrid cityData", cityData);
  console.log("ImageGrid userUpvoteData", userUpvoteData);

  const userUpvoteMemo: UserUpvoteMemo = {};
  userUpvoteData?.forEach((upvote) => {
    userUpvoteMemo[upvote.attractionId] = true;
  });

  return (
    <ul
      role="list"
      className="grid grid-cols-2 gap-x-4 gap-y-8 border-2 border-slate-500 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
    >
      {attractions?.map((attraction) => {
        const userHasUpvotedAttraction = !!userUpvoteMemo[attraction.id];

        return (
          <GridElement
            key={attraction.id}
            attraction={attraction}
            userHasUpvotedAttraction={userHasUpvotedAttraction}
          />
        );

        // return (
        //   <li
        //     key={attraction.id}
        //     className="relative w-full border-2 border-blue-400"
        //   >
        //     <div className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
        //       <Image
        //         // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        //         src={attraction.imageURL}
        //         alt=""
        //         className="pointer-events-none object-cover group-hover:opacity-75"
        //         width={100}
        //         height={100}
        //         unoptimized
        //       />
        //     </div>
        //     <p className="pointer-events-none mt-2 block truncate text-center text-sm font-medium text-gray-900">
        //       {attraction.name}
        //     </p>

        //     {/* Upvotes */}
        //     <button
        //       className="inline-flex items-center rounded-md bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600  disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none"
        //       onClick={upvoteHandler}
        //       disabled={isUpvoting}
        //     >
        //       {isUpvoting ? (
        //         <LoadingSpinner />
        //       ) : (
        //         <ThumbsUpIcon enabled={userHasUpvotedAttraction} />
        //       )}
        //       <span
        //         className={`mx-1 ${
        //           userHasUpvotedAttraction ? "text-green-500" : ""
        //         }`}
        //       >
        //         {attraction?.upvotes.length ?? 0}
        //       </span>
        //     </button>
        //   </li>
        // );
      })}
    </ul>
  );
};

export default ImageGrid;
