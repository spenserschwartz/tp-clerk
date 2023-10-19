import { Transition } from "@headlessui/react";
import Image from "next/image";
import React from "react";

interface FeaturesTabProps {
  tab: number;
  tabs: React.RefObject<HTMLDivElement>;
}

const FeaturesTab = ({ tab, tabs }: FeaturesTabProps) => {
  const heightFix = () => {
    if (tabs.current?.parentElement)
      tabs.current.parentElement.style.height = `${tabs.current.clientHeight}px`;
  };

  return (
    <Transition
      show={tab === 1}
      appear={true}
      className="flex w-full justify-center border border-green-500"
      enter="transition ease-in-out duration-700 transform order-first"
      enterFrom="opacity-0 translate-y-16"
      enterTo="opacity-100 translate-y-0"
      leave="transition ease-in-out duration-300 transform absolute"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 -translate-y-16"
      beforeEnter={() => heightFix()}
      unmount={false}
    >
      <div className="min-group relative flex h-96 items-end border border-red-500">
        {/* <Image
                        className="animate-float left-0 mx-auto w-full transform rounded-lg shadow-lg md:max-w-none"
                        src="https://travelperfect-bucket.s3.us-west-1.amazonaws.com/Screenshot+-+QuickLaunch.png"
                        width={500}
                        height="44"
                        alt="Element"
                        // style={{ top: "30%" }}
                      /> */}
        <Image
          className="mx-auto rounded group-hover:blur md:max-w-none"
          src="https://travelperfect-bucket.s3.us-west-1.amazonaws.com/screenshot_quick_itinerary.png"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "auto", height: "90%" }}
          alt="Screenshot of quick itinerary"
        />

        {/* Button to anchor quickLaunch */}
        <div className="animate-float invisible absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 transform justify-center rounded-md border border-green-400 group-hover:visible md:max-w-none">
          <button
            type="button"
            className="rounded-md  bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <a href="#quick_launch">Try it out</a>
          </button>
        </div>
      </div>
    </Transition>
  );
};

export default FeaturesTab;
