import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface CarouselProps {
  slides: string[];
}

const slides = [
  "https://images.unsplash.com/photo-1486299267070-83823f5448dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80",
  "https://images.unsplash.com/photo-1529180184525-78f99adb8e98?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  "https://images.unsplash.com/photo-1560969185-ee68ef9080c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1578666062144-080ac96e3e24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
];

export default function Carousel({ slides }: CarouselProps) {
  const [current, setCurrent] = useState(0);

  const previousSlide = () => {
    if (current === 0) setCurrent(slides.length - 1);
    else setCurrent(current - 1);
  };

  const nextSlide = () => {
    if (current === slides.length - 1) setCurrent(0);
    else setCurrent(current + 1);
  };

  return (
    <div className="relative overflow-hidden">
      <div
        className={`duration-40 flex transition ease-out`}
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {slides.map((slide) => {
          //   return <img src={s} />;
          return (
            <Image
              key={`Carousel_Image-${slide}`}
              src={slide || "/images/placeholder.png"}
              alt={`Carousel_Image-${slide}`}
              width={500}
              height={500}
              priority
            />
          );
        })}
      </div>

      <div className="absolute top-0 flex h-full w-full items-center justify-between px-10 text-3xl text-white">
        <button onClick={previousSlide}>
          <ArrowLeftCircleIcon />
        </button>
        <button onClick={nextSlide}>
          <ArrowRightCircleIcon />
        </button>
      </div>

      <div className="absolute bottom-0 flex w-full justify-center gap-3 py-4">
        {slides.map((s, i) => {
          return (
            <div
              onClick={() => {
                setCurrent(i);
              }}
              key={"circle" + i}
              className={`h-3 w-3 cursor-pointer rounded-full  ${
                i == current ? "bg-white" : "bg-gray-500"
              }`}
            ></div>
          );
        })}
      </div>
    </div>
  );
}
