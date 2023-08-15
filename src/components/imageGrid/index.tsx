import Image from "next/image";
import {
  imageClassName,
  imageContainerClassName,
  imageGridClassName,
  listItemClassName,
} from "./styles";
import { RouterInputs } from "~/utils/api";

const files = [
  {
    title: "IMG_4985.HEIC",
    size: "3.9 MB",
    source:
      "https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
  },
  // More files...
];

const ImageGrid = () => {
  return (
    <ul role="list" className={imageGridClassName}>
      {files.map((file) => (
        <li key={file.source} className={listItemClassName}>
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
