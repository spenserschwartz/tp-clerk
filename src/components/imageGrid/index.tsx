import Image from "next/image";
import {
  imageClassName,
  imageContainerClassName,
  listItemClassName,
} from "./styles";

import type { RouterOutputs } from "~/utils/api";
import { ThumbsUpIcon } from "public/icons";
import { prisma } from "~/server/db";
import { api } from "~/utils/api";

type GetCityByNameType = RouterOutputs["city"]["getCityByName"];
interface ImageGridProps {
  cityData: GetCityByNameType;
}

const ImageGrid = ({ cityData }: ImageGridProps) => {
  if (!cityData) return null;
  console.log("ImageGrid cityData", cityData);

  // ! Type error. Look at eslint-disable
  const { attractions } = cityData;

  const { data: upVoteCount } = api.attractions.getById.useQuery({
    id: "cll4b5ois0000z4ka8u0wdhdi",
  });
  console.log("upVoteCount", upVoteCount);

  const { data: londonData } = api.city.getCityByName.useQuery({
    name: cityData.name,
  });
  console.log("londonData", londonData);

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
            <div className="flex justify-center">
              <ThumbsUpIcon />
              {attraction?.upvotes.length}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ImageGrid;
