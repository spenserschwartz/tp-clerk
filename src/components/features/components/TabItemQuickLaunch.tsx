import { Transition } from "@headlessui/react";
import Image from "next/image";
import React from "react";

import { screenshots } from "~/utils/images";

interface FeaturesTabProps {
  tab: number;
  tabs: React.RefObject<HTMLDivElement>;
}

const TabItemQuickLaunch = ({ tab, tabs }: FeaturesTabProps) => {
  const heightFix = () => {
    if (tabs.current?.parentElement)
      tabs.current.parentElement.style.height = `${tabs.current.clientHeight}px`;
  };

  return (
    <Transition
      show={tab === 1}
      appear={true}
      className="flex w-full justify-center"
      enter="transition ease-in-out duration-700 transform order-first"
      enterFrom="opacity-0 translate-y-16"
      enterTo="opacity-100 translate-y-0"
      leave="transition ease-in-out duration-300 transform absolute"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 -translate-y-16"
      beforeEnter={() => heightFix()}
      unmount={false}
    >
      <div className="group relative flex h-96 items-end ">
        <Image
          className="mx-auto rounded md:max-w-none md:group-hover:blur"
          src={screenshots.quickItinerary}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "auto", height: "90%" }}
          alt="Screenshot of quick itinerary"
        />

        {/* Button to anchor quickLaunch */}
        <div className="animate-float invisible absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 transform justify-center rounded-md md:max-w-none md:group-hover:visible">
          <button
            type="button"
            className="rounded-md  bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <a href="#quick_launch">Make a quick trip!</a>
          </button>
        </div>
      </div>
    </Transition>
  );
};

export default TabItemQuickLaunch;
