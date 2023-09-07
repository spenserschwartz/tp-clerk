import Image from "next/image";

import type { RouterOutputs } from "~/utils/api";
import { ThumbsUpIcon } from "public/icons";

type GetCityByNameType = RouterOutputs["city"]["getCityByName"];
type GetUpvotesByUserInCityType =
  RouterOutputs["upvotes"]["getAllByUserInCity"];
interface ImageGridProps {
  cityData: GetCityByNameType;
  userUpvoteData: GetUpvotesByUserInCityType | undefined; // undefined if user is not logged in
}

type UserUpvoteMemo = Record<string, boolean>;

const ImageGrid = ({ cityData, userUpvoteData }: ImageGridProps) => {
  if (!cityData) return null;
  console.log("ImageGrid cityData", cityData);
  console.log("ImageGrid userUpvoteData", userUpvoteData);

  // ! Type error. Look at eslint-disable
  const { attractions } = cityData;

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
            <div className="flex justify-center">
              <ThumbsUpIcon enabled={!!userUpvoteMemo[attraction.id]} />
              <div className="ml-1">{attraction?.upvotes.length}</div>
              <div>
                Did you upvote? {userUpvoteMemo[attraction.id] ? "yes" : "no"}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ImageGrid;
