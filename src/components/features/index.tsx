"use client";

import { useEffect, useRef, useState } from "react";

import TabItemCitySplash from "./components/TabItemCitySplash";
import TabItemQuickLaunch from "./components/TabItemQuickLaunch";

export default function Features() {
  const [tab, setTab] = useState<number>(1);
  const tabs = useRef<HTMLDivElement>(null);

  const heightFix = () => {
    if (tabs.current?.parentElement)
      tabs.current.parentElement.style.height = `${tabs.current.clientHeight}px`;
  };

  useEffect(() => {
    heightFix();
  }, []);

  return (
    <section className="relative">
      {/* Section background (needs .relative class on parent and next sibling elements) */}
      <div
        className="pointer-events-none absolute inset-0 mb-16 bg-gray-100"
        aria-hidden="true"
      ></div>

      {/* Vertical line between sections */}
      <div className="absolute left-0 right-0 m-auto h-20 w-px -translate-y-1/2 transform bg-gray-200 p-px"></div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="pt-12 md:pt-20" id="explore_solutions">
          {/* Section header */}
          <div className="mx-auto max-w-3xl pb-12 text-center md:pb-16">
            <h1 className="h2 mb-4">Explore the solutions</h1>
            <p className="text-xl text-gray-600">
              Use a combination of AI and real travel experience to make your
              next trip flawless. Customize it with your interests to be the
              perfect trip for you!
            </p>
          </div>

          {/* Section content */}
          <div className="md:grid md:grid-cols-12 md:gap-6">
            {/* Content */}
            <div
              className="mx-auto max-w-xl md:col-span-7 md:mt-6 md:w-full md:max-w-none lg:col-span-6"
              data-aos="fade-right"
            >
              <div className="mb-8 md:pr-4 lg:pr-12 xl:pr-16">
                <h3 className="h3 mb-3">Powerful suite of tools</h3>
                <p className="text-xl text-gray-600">
                  See some of the features that make TravelPerfect the future
                  for planning your next trip. We are constantly adding new
                  features for a better experience.
                </p>
              </div>
              {/* Tabs buttons */}
              <div className="mb-8 md:mb-0">
                <a
                  className={`mb-3 flex items-center rounded border p-5 text-lg transition duration-300 ease-in-out ${
                    tab !== 1
                      ? "border-gray-200 bg-white shadow-md hover:shadow-lg"
                      : "border-transparent bg-gray-200"
                  }`}
                  href="#0"
                  onClick={(e) => {
                    e.preventDefault();
                    setTab(1);
                  }}
                >
                  <div>
                    <div className="mb-1 font-bold leading-snug tracking-tight">
                      Quick Launch Itinerary
                    </div>
                    <div className="text-gray-600">
                      Make a trip in seconds with our AI trip planner. Just say
                      a city and your dates and we will do the rest!
                    </div>
                  </div>
                  <div className="ml-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white shadow">
                    <svg
                      className="h-3 w-3 fill-current"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M11.953 4.29a.5.5 0 00-.454-.292H6.14L6.984.62A.5.5 0 006.12.173l-6 7a.5.5 0 00.379.825h5.359l-.844 3.38a.5.5 0 00.864.445l6-7a.5.5 0 00.075-.534z" />
                    </svg>
                  </div>
                </a>
                <a
                  className={`mb-3 flex items-center rounded border p-5 text-lg transition duration-300 ease-in-out ${
                    tab !== 2
                      ? "border-gray-200 bg-white shadow-md hover:shadow-lg"
                      : "border-transparent bg-gray-200"
                  }`}
                  href="#0"
                  onClick={(e) => {
                    e.preventDefault();
                    setTab(2);
                  }}
                >
                  <div>
                    <div className="mb-1 font-bold leading-snug tracking-tight">
                      Building the Simple ecosystem
                    </div>
                    <div className="text-gray-600">
                      Take collaboration to the next level with security and
                      administrative features built for teams.
                    </div>
                  </div>
                  <div className="ml-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white shadow">
                    <svg
                      className="h-3 w-3 fill-current"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.854.146a.5.5 0 00-.525-.116l-11 4a.5.5 0 00-.015.934l4.8 1.921 1.921 4.8A.5.5 0 007.5 12h.008a.5.5 0 00.462-.329l4-11a.5.5 0 00-.116-.525z"
                        fillRule="nonzero"
                      />
                    </svg>
                  </div>
                </a>
              </div>
            </div>

            {/* Tabs items */}
            <div className="mx-auto mb-8 max-w-xl md:order-1 md:col-span-5 md:mb-0 md:w-full md:max-w-none lg:col-span-6">
              <div className="transition-all">
                <div
                  className="relative flex flex-col text-center lg:text-right"
                  data-aos="zoom-y-out"
                  ref={tabs}
                >
                  {/* Item 1 */}
                  <TabItemQuickLaunch tab={tab} tabs={tabs} />

                  {/* Item 2 */}
                  <TabItemCitySplash tab={tab} tabs={tabs} />

                  {/* Item 3 */}
                  {/* TODO: Add third tab */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
