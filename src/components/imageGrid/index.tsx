import Image from "next/image";
import {
  imageClassName,
  imageContainerClassName,
  listItemClassName,
} from "./styles";

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

  console.log("userUpvoteMemo", userUpvoteMemo);

  return (
    <ul
      role="list"
      className="grid grid-cols-2 gap-x-4 gap-y-8 border-2 border-red-500 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
    >
      {attractions?.map((attraction) => {
        return (
          <li key={attraction.id} className={listItemClassName}>
            <div className={imageContainerClassName}>
              <Image
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                src={attraction.imageURL}
                alt=""
                className={imageClassName}
                width={100}
                height={100}
                unoptimized
              />
            </div>
            <p className="pointer-events-none mt-2 block truncate text-center text-sm font-medium text-gray-900">
              {attraction.name}
            </p>

            {/* Upvotes */}
            <div className="flex justify-center fill-green-500">
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
