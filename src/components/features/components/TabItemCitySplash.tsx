import { Transition } from "@headlessui/react";
import Image from "next/image";

import { screenshots } from "~/utils/images";

interface FeaturesTabProps {
  tab: number;
  tabs: React.RefObject<HTMLDivElement>;
}

const TabItemCitySplash = ({ tab, tabs }: FeaturesTabProps) => {
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
      <div className="group relative inline-flex flex-col rounded-lg shadow-2xl ">
        <Image
          className="mx-auto rounded md:max-w-none md:group-hover:blur"
          src={screenshots.londonSplash}
          width={500}
          height="462"
          alt="Features bg"
        />
      </div>
    </Transition>
  );
};

export default TabItemCitySplash;
