import { Combobox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import usePlacesAutocomplete, {
  type Suggestion,
} from "use-places-autocomplete";
import type { PlaceResult } from "~/types/google";

interface PlacesAutoCompleteProps {
  // setSelected: (value: string) => void;
  setSelected: (value: PlaceResult | null) => void;
}

const PlacesAutoComplete = ({ setSelected }: PlacesAutoCompleteProps) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
    // } = usePlacesAutocomplete({ requestOptions: { types: ["establishment"] } });
  } = usePlacesAutocomplete({ requestOptions: { types: ["(cities)"] } });

  const handleSelect = (address: string) => {
    setValue(address, false);
    clearSuggestions();

    const place_id = data.find(
      (place: Suggestion) => place.description === address
    )?.place_id;

    const fetchDetails = () => {
      if (!place_id) return;

      const map = new window.google.maps.Map(document.createElement("div"));
      const service = new window.google.maps.places.PlacesService(map);

      service.getDetails(
        {
          placeId: place_id,
          fields: ["name", "formatted_address", "geometry", "photo"],
        },
        (result, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            // Do something with the result object here
            const placeResult: PlaceResult | null = result;
            setSelected(placeResult);
          }
        }
      );
    };

    fetchDetails();

    // setSelected(address);
  };

  return (
    <>
      <div className="w-full">
        <Combobox
          as="div"
          value={value}
          onChange={handleSelect}
          disabled={!ready}
        >
          <div className="relative">
            <Combobox.Input
              className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={(event) => setValue(event.target.value)}
              // displayValue={(place: Suggestion) => place.description}
              displayValue={() => value}
              placeholder="Search for a place"
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>

            {status === "OK" && (
              <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {data.map(({ place_id, description }) => (
                  <Combobox.Option
                    key={place_id}
                    value={description}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-3 pr-9 
                        ${active ? "bg-indigo-600 text-white" : "text-gray-900"}
                        `
                    }
                  >
                    {({ active, selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected && "font-semibold"
                          }`}
                        >
                          {description}
                        </span>

                        {selected && (
                          <span
                            className={`absolute inset-y-0 right-0 flex items-center pr-4 ${
                              active ? "text-white" : "text-indigo-600"
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        )}
                      </>
                    )}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            )}
          </div>
        </Combobox>
      </div>
    </>
  );
};

export default PlacesAutoComplete;
