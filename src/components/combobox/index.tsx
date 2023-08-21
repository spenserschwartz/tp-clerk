import React, { useState } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Combobox as HeadlessCombobox } from "@headlessui/react";

// const people = [
//   { id: 1, name: "Leslie Alexander" },
//   // More users...
// ];

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(" ");
}

interface ComboboxOptionsType {
  name: string;
  id: string;
}

interface ComboboxInterface {
  options: ComboboxOptionsType[];
}

export default function Combobox({ options }: ComboboxInterface) {
  const [query, setQuery] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState(null);

  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) => {
          return option.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <HeadlessCombobox
      as="div"
      value={selectedOption}
      onChange={setSelectedOption}
    >
      <HeadlessCombobox.Label className="block text-sm font-medium leading-6 text-gray-900">
        Assigned to
      </HeadlessCombobox.Label>
      <div className="relative mt-2">
        <HeadlessCombobox.Input
          className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setQuery(event.target.value)
          }
          displayValue={(option: ComboboxOptionsType) => option?.name}
        />
        <HeadlessCombobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </HeadlessCombobox.Button>

        {filteredOptions.length > 0 && (
          <HeadlessCombobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredOptions.map((option) => (
              <HeadlessCombobox.Option
                key={option.id}
                value={option}
                className={({ active }) =>
                  classNames(
                    "relative cursor-default select-none py-2 pl-3 pr-9",
                    active ? "bg-indigo-600 text-white" : "text-gray-900"
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span
                      className={classNames(
                        "block truncate",
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                        selected && "font-semibold"
                      )}
                    >
                      {option.name}
                    </span>

                    {selected && (
                      <span
                        className={classNames(
                          "absolute inset-y-0 right-0 flex items-center pr-4",
                          active ? "text-white" : "text-indigo-600"
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </HeadlessCombobox.Option>
            ))}
          </HeadlessCombobox.Options>
        )}
      </div>
    </HeadlessCombobox>
  );
}
