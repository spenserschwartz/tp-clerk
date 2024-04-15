"use client";
import { Carousel } from "@/components";
import { FadeUpWrapper, ZoomInUpWrapper } from "@/framer-motion";

export default function Hero() {
  return (
    <section className="relative mt-6">
      {/* Illustration behind hero content */}
      <div
        className="-z-1 pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 transform"
        aria-hidden="true"
      >
        <svg
          width="1360"
          height="578"
          viewBox="0 0 1360 578"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              x1="50%"
              y1="0%"
              x2="50%"
              y2="100%"
              id="illustration-01"
            >
              <stop stopColor="#FFF" offset="0%" />
              <stop stopColor="#EAEAEA" offset="77.402%" />
              <stop stopColor="#DFDFDF" offset="100%" />
            </linearGradient>
          </defs>
          <g fill="url(#illustration-01)" fillRule="evenodd">
            <circle cx="1232" cy="128" r="128" />
            <circle cx="155" cy="443" r="64" />
          </g>
        </svg>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Hero content */}
        <div className="flex flex-col items-center pb-12 md:pb-20 ">
          {/* Section header */}

          <ZoomInUpWrapper>
            <div className="pb-12 text-center md:pb-16">
              {/* Page Title */}
              <h1 className="leading-tighter mb-4 text-5xl font-extrabold tracking-tighter md:text-6xl">
                Travel
                <span className="bg-gradient-to-r from-purple-500 to-violet-400 bg-clip-text text-transparent">
                  Perfect
                </span>
              </h1>

              {/* Description */}

              <div className="mx-auto max-w-3xl">
                <p className="mb-8 text-xl text-gray-600">
                  TravelPerfect is a travel planning tool that helps you plan
                  your next vacation.
                </p>

                <div className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center">
                  <div>
                    <a
                      className="btn mb-4 w-full bg-blue-600 text-white hover:bg-blue-700 sm:mb-0 sm:w-auto"
                      href="#quick_launch"
                    >
                      Quick Launch
                    </a>
                  </div>
                  <div>
                    <a
                      className="btn w-full bg-gray-900 text-white hover:bg-gray-800 sm:ml-4 sm:w-auto"
                      href="#explore_solutions"
                    >
                      Learn more
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </ZoomInUpWrapper>

          {/* Image Carousel */}
          <FadeUpWrapper>
            <Carousel />
          </FadeUpWrapper>
        </div>
      </div>
    </section>
  );
}
