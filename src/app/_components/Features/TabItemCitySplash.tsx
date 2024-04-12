"use client";
import { Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface FeaturesTabProps {
  tab: number;
  tabs: React.RefObject<HTMLDivElement>;
}

const screenshots = {
  londonSplash:
    "https://travelperfect-bucket.s3.us-west-1.amazonaws.com/screenshots/london_splash",
  quickItinerary:
    "https://travelperfect-bucket.s3.us-west-1.amazonaws.com/screenshots/quick_itinerary",
};

const TabItemCitySplash = ({ tab, tabs }: FeaturesTabProps) => {
  const [isClicked, setIsClicked] = useState(false); // for mobile
  const handleClick = () => setIsClicked(!isClicked);

  const heightFix = () => {
    if (tabs.current?.parentElement)
      tabs.current.parentElement.style.height = `${tabs.current.clientHeight}px`;
  };

  return (
    <Transition
      show={tab === 2}
      appear={true}
      className="w-full"
      enter="transition ease-in-out duration-700 transform order-first"
      enterFrom="opacity-0 translate-y-16"
      enterTo="opacity-100 translate-y-0"
      leave="transition ease-in-out duration-300 transform absolute"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 -translate-y-16"
      beforeEnter={() => heightFix()}
      unmount={false}
    >
      <div
        className="group relative inline-flex flex-col rounded-lg shadow-2xl"
        onClick={handleClick}
      >
        <Image
          className={`mx-auto rounded group-hover:blur md:max-w-none ${
            isClicked ? "blur" : "" // should be blurred if clicked (for mobile) or hovered
          }`}
          src={screenshots.londonSplash}
          width="500"
          height="462"
          alt="Features bg"
          style={{ width: "100%", height: "auto" }}
        />

        {/* Button to anchor quickLaunch */}
        <div
          className={`animate-float ${
            isClicked ? "" : "invisible" // should be invisible if not clicked (for mobile) or hovered
          } absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 transform justify-center rounded-md group-hover:visible md:max-w-none`}
        >
          {" "}
          <button
            type="button"
            className="rounded-md  bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <Link href="/city/london">{`See London's page`}</Link>
          </button>
        </div>
      </div>
    </Transition>
  );
};

export default TabItemCitySplash;
