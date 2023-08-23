import Image from "next/image";
import {
  imageClassName,
  imageContainerClassName,
  imageGridClassName,
  listItemClassName,
} from "./styles";

import type { RouterOutputs } from "~/utils/api";
type GetCityByNameType = RouterOutputs["city"]["getCityByName"];
interface ImageGridProps {
  cityData: GetCityByNameType;
}

const ImageGrid = ({ cityData }: ImageGridProps) => {
  console.log("ImageGrid cityData", cityData);

  const { attractions } = cityData ?? { attractions: null };
  console.log("attractions", attractions);

  return (
    <ul role="list" className={imageGridClassName}>
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
          <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
            {attraction.name}
          </p>
          <p className="pointer-events-none block text-sm font-medium text-gray-500">
            {attraction.name}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default ImageGrid;
