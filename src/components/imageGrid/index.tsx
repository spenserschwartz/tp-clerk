import Image from "next/image";
import {
  imageClassName,
  imageContainerClassName,
  imageGridClassName,
  listItemClassName,
} from "./styles";

import type { RouterOutputs } from "~/utils/api";

const files = [
  {
    title: "IMG_4985.HEIC",
    size: "3.9 MB",
    source:
      "https://images.unsplash.com/photo-1486299267070-83823f5448dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80",
  },
  {
    title: "IMG_4986.HEIC",
    size: "3.9 MB",
    source:
      "https://images.unsplash.com/photo-1486299267070-83823f5448dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80",
  },
  {
    title: "IMG_4987.HEIC",
    size: "3.9 MB",
    source:
      "https://images.unsplash.com/photo-1486299267070-83823f5448dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80",
  },
  {
    title: "IMG_4988.HEIC",
    size: "3.9 MB",
    source:
      "https://images.unsplash.com/photo-1486299267070-83823f5448dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80",
  },
  {
    title: "IMG_4989.HEIC",
    size: "3.9 MB",
    source:
      "https://images.unsplash.com/photo-1486299267070-83823f5448dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80",
  },
  // More files...
];

type GetCityByNameType = RouterOutputs["city"]["getCityByName"];

interface ImageGridProps {
  cityData: GetCityByNameType;
}

const ImageGrid = ({ cityData }: ImageGridProps) => {
  console.log("ImageGrid cityData", cityData);
  return (
    <ul role="list" className={imageGridClassName}>
      {files.map((file) => (
        <li key={file.title} className={listItemClassName}>
          <div className={imageContainerClassName}>
            <Image
              src={file.source}
              alt=""
              className={imageClassName}
              width={100}
              height={100}
            />
            {/* <button
              type="button"
              className="absolute inset-0 focus:outline-none"
            >
              <span className="sr-only">View details for {file.title}</span>
            </button> */}
          </div>
          <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
            {file.title}
          </p>
          <p className="pointer-events-none block text-sm font-medium text-gray-500">
            {file.size}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default ImageGrid;
