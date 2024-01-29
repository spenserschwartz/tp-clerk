import Image from "next/image";
import React from "react";

interface ImageGalleryProps {
  images: string[];
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const largeImageSizes = "(min-width: 768px) 50vw, 100vw";
  const smallImageSizes = "(min-width: 768px) 25vw, 50vw";

  return (
    <div className="flex w-full min-w-[400px] max-w-4xl flex-grow justify-center overflow-hidden rounded-xl">
      <div className="grid h-full w-full grid-cols-4 grid-rows-2 gap-2 border border-green-400">
        <div className="aspect-h-1 aspect-w-1 relative col-span-2 row-span-2 bg-gray-500">
          {/* Placeholder for large image */}
          <Image
            src={images[0] ?? "/images/placeholder.png"}
            className="object-cover object-center hover:opacity-75"
            alt="Placeholder for large image"
            fill
            sizes={largeImageSizes}
            priority
          />
        </div>

        {images.slice(1).map((image, index) => (
          <div
            key={index}
            className="aspect-h-1 aspect-w-1 col-span-1 row-span-1 bg-gray-300"
          >
            <Image
              src={image ?? "/images/placeholder.png"}
              className="object-cover object-center hover:opacity-75"
              alt="Placeholder for small images"
              fill
              sizes={smallImageSizes}
              priority
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
