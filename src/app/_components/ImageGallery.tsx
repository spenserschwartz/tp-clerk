import Image from "next/image";

interface ImageGalleryProps {
  images: string[];
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const largeImageSizes = "(min-width: 768px) 50vw, 100vw";
  const smallImageSizes = "(min-width: 768px) 25vw, 50vw";

  //   const mediumStyles =
  //     "md:aspect-h-1 md:aspect-w-1 md:relative md:col-span-2 md:row-span-2 md:bg-gray-500";

  if (images.length === 0) return null;
  return (
    <div className="flex w-full min-w-[400px] flex-grow justify-center overflow-hidden rounded-xl">
      <div className="grid h-full w-full grid-cols-4 grid-rows-2 gap-2 ">
        <div className="aspect-h-1 aspect-w-1 relative col-span-2 row-span-2 bg-gray-500">
          {/* Placeholder for large image */}
          <Image
            src={images[0] ?? "/images/placeholder.png"}
            className="object-cover object-center hover:opacity-75"
            alt="Placeholder for large image"
            fill
            sizes={largeImageSizes}
            priority
            unoptimized
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
              unoptimized
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;

// ! Mobile in progress
// import Image from "next/image";
// import React from "react";

// interface ImageGalleryProps {
//   images: string[];
// }

// const ImageGallery = ({ images }: ImageGalleryProps) => {
//   const largeImageSizes = "(min-width: 768px) 50vw, 100vw";
//   const smallImageSizes = "(min-width: 768px) 25vw, 50vw";

//   if (images.length === 0) return null;
//   return (
//     <div className="flex w-full min-w-[400px] flex-grow justify-center overflow-hidden rounded-xl">
//       <div className="grid h-full w-full grid-cols-4 grid-rows-2 gap-2">
//         <div className="aspect-h-1 aspect-w-2 relative col-span-2 row-span-2 bg-gray-500 md:aspect-h-1 md:aspect-w-1">
//           {/* Placeholder for large image */}
//           <Image
//             src={images[0] ?? "/images/placeholder.png"}
//             className="object-cover object-center hover:opacity-75"
//             alt="Placeholder for large image"
//             fill
//             sizes={largeImageSizes}
//             priority
//           />
//         </div>

//         {images.slice(1).map((image, index) => (
//           <div
//             key={index}
//             className="hidden bg-gray-300 md:aspect-h-1 md:aspect-w-1 md:col-span-1 md:row-span-1 md:block"
//           >
//             <Image
//               src={image ?? "/images/placeholder.png"}
//               className="object-cover object-center hover:opacity-75"
//               alt="Placeholder for small images"
//               fill
//               sizes={smallImageSizes}
//               priority
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ImageGallery;
