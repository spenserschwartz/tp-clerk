import { Menu } from "@headlessui/react";
import {
  PencilIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";

const DropdownMenu = () => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 text-gray-700 opacity-50 hover:bg-gray-500 hover:text-gray-900">
        <PencilIcon className="h-5 w-5" aria-hidden="true" />
      </Menu.Button>

      <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="px-1 py-1 ">
          <Menu.Item>
            {({ active }) => (
              <button
                className={`${
                  active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
              >
                <PencilSquareIcon
                  className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
                Edit (in progress)
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                className={`${
                  active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
              >
                <TrashIcon
                  className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
                Delete Itinerary
              </button>
            )}
          </Menu.Item>
        </div>
      </Menu.Items>
    </Menu>
  );
};

export default DropdownMenu;
