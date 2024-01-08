import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import { ZoomInWrapper } from "@framer-motion";

interface CarouselProps {
  slides: string[];
}

export default function Carousel({ slides }: CarouselProps) {
  const [current, setCurrent] = useState(0);

  const previousSlide = () => {
    if (current === 0) setCurrent(slides.length - 1);
    else setCurrent(current - 1);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const nextSlide = () => {
    if (current === slides.length - 1) setCurrent(0);
    else setCurrent(current + 1);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(intervalId);
  }, [nextSlide]);

  return (
    <ZoomInWrapper>
      <div className="relative overflow-hidden">
        <div
          className={`flex transition duration-500 ease-out`}
          style={{
            transform: `translateX(-${current * 100}%)`,
          }}
        >
          {slides.map((slide) => {
            //   return <img src={s} />;
            return (
              <Image
                className="rounded-xl shadow-md"
                key={`Carousel_Image-${slide}`}
                src={slide || "/images/placeholder.png"}
                alt={`Carousel_Image-${slide}`}
                width={800}
                height={800}
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
    </ZoomInWrapper>
  );
}
