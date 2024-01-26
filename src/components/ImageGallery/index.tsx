import React from "react";

interface ImageGalleryProps {
  images: string[];
}

const ImageGallery = ({
  images = ["a", "b", "c", "d", "e"],
}: ImageGalleryProps) => {
  return (
    <div className="flex min-w-[400px] max-w-4xl justify-center border border-red-400">
      <div className="grid h-full w-full grid-cols-4 grid-rows-2 gap-4 border border-green-400">
        <div className="aspect-h-1 aspect-w-1 relative col-span-2 row-span-2 bg-gray-500">
          {/* Placeholder for large image */}
        </div>

        {images.slice(1).map((image, index) => (
          <div
            key={index}
            className="aspect-h-1 aspect-w-1 col-span-1 row-span-1 bg-gray-300"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
