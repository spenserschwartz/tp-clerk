import Image from "next/image";
import {
  imageClassName,
  imageContainerClassName,
  listItemClassName,
} from "./styles";

import type { RouterOutputs } from "~/utils/api";
import { ThumbsUpIcon } from "public/icons";
type GetCityByNameType = RouterOutputs["city"]["getCityByName"];
interface ImageGridProps {
  cityData: GetCityByNameType;
}

const ImageGrid = ({ cityData }: ImageGridProps) => {
  console.log("ImageGrid cityData", cityData);

  const { attractions } = cityData ?? { attractions: null };
  console.log("attractions", attractions);

  return (
    <ul
      role="list"
      className="grid grid-cols-2 gap-x-4 gap-y-8 border-2 border-red-500 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
    >
      {attractions?.map((attraction) => (
        <li key={attraction.id} className={listItemClassName}>
          <div className={imageContainerClassName}>
            <Image
              src={attraction?.imageURL as string}
              alt=""
              className={imageClassName}
              width={100}
              height={100}
            />
          </div>
          <p className="pointer-events-none mt-2 block truncate text-center text-sm font-medium text-gray-900">
            {attraction.name}
          </p>

          <div className="flex justify-center">
            <ThumbsUpIcon /> 99
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ImageGrid;
