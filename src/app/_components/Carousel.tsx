"use client";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useState } from "react";

import {
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Carousel as ShadCNCarousel,
} from "@/shadcn";

const slides: string[] = [
  "https://images.unsplash.com/photo-1486299267070-83823f5448dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80",
  "https://images.unsplash.com/photo-1529180184525-78f99adb8e98?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  "https://images.unsplash.com/photo-1560969185-ee68ef9080c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1578666062144-080ac96e3e24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
];

const Carousel = () => {
  const [isGrabbing, setIsGrabbing] = useState(false);

  return (
    <ShadCNCarousel
      className="max-w-2xl"
      opts={{ loop: true }}
      plugins={[Autoplay({ delay: 4000 })]}
    >
      <CarouselContent>
        {slides.map((slide, index) => (
          <CarouselItem key={index}>
            <div className="flex justify-center p-1">
              <Image
                className={`rounded-xl shadow-md ${isGrabbing ? "cursor-grabbing" : "cursor-grab"}`}
                key={`Carousel_Image-${slide}`}
                src={slide || "/images/placeholder.png"}
                alt={`Carousel_Image-${slide}`}
                width={800}
                height={800}
                priority
                onMouseDown={() => setIsGrabbing(true)}
                onMouseLeave={() => setIsGrabbing(false)}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </ShadCNCarousel>
  );
};

export default Carousel;
