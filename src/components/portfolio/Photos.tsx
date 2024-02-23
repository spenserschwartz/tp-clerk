import clsx from "clsx";
import Image from "next/image";

const Photos = () => {
  const rotations = [
    "rotate-2",
    "-rotate-2",
    "rotate-2",
    "rotate-2",
    "-rotate-2",
  ];

  const images = [
    "https://travelperfect-bucket.s3.us-west-1.amazonaws.com/portfolio/Itinerary+View.png",
    "https://travelperfect-bucket.s3.us-west-1.amazonaws.com/portfolio/Peru+Alpaca.png",
    "https://travelperfect-bucket.s3.us-west-1.amazonaws.com/portfolio/Screenshot+2024-02-22+at+10.27.57%E2%80%AFPM.png",
    "https://travelperfect-bucket.s3.us-west-1.amazonaws.com/portfolio/Hang+En+Cave.png",
  ];

  return (
    <div className="mt-16 sm:mt-20">
      <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
        {images.map((image, imageIndex) => (
          <div
            key={image}
            className={clsx(
              "relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100 dark:border-none dark:bg-zinc-800 sm:w-72 sm:rounded-2xl",
              rotations[imageIndex % rotations.length]
            )}
          >
            <Image
              src={image}
              alt=""
              sizes="(min-width: 640px) 18rem, 11rem"
              fill
              className="absolute inset-0 h-full w-full object-cover"
              priority
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Photos;
