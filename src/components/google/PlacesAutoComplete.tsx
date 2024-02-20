import { Combobox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { useCallback, useEffect, useState, type ChangeEvent } from "react";

import type {
  AutocompleteRequest,
  PlaceResult,
  PlacesService,
} from "~/types/google";

interface PlacesAutoCompleteProps {
  setSelected: (value: PlaceResult | null) => void;
  requestOptions: AutocompleteRequest;
}

// This uses the Combobox from "react-widgets" (https://jquense.github.io/react-widgets/docs/Combobox)
const PlacesAutoComplete = ({
  requestOptions,
  setSelected,
}: PlacesAutoCompleteProps) => {
  const placesLib = useMapsLibrary("places");
  const [placesService, setPlacesService] = useState<PlacesService | null>(
    null
  );
  const [sessionToken, setSessionToken] =
    useState<google.maps.places.AutocompleteSessionToken>();
  const [autocompleteService, setAutocompleteService] =
    useState<google.maps.places.AutocompleteService | null>(null);
  const [predictionResults, setPredictionResults] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [fetchingData, setFetchingData] = useState<boolean>(false);

  // Correctly initializing PlacesService with a div element
  useEffect(() => {
    if (!placesLib) return;
    const map = new google.maps.Map(document.createElement("div"));

    const newPlacesService = new placesLib.PlacesService(map);
    setAutocompleteService(new placesLib.AutocompleteService());
    setPlacesService(newPlacesService);
    setSessionToken(new placesLib.AutocompleteSessionToken());
  }, [placesLib]);

  const fetchPredictions = useCallback(
    async (request: AutocompleteRequest) => {
      if (!autocompleteService || !request.input) return null;

      setFetchingData(true);

      const response = await autocompleteService.getPlacePredictions(request);

      setPredictionResults(response.predictions);
      setFetchingData(false);
    },
    [autocompleteService]
  );

  const onInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
      const request: AutocompleteRequest = {
        ...requestOptions,
        input: event.target.value,
        sessionToken,
      };
      console.log("this is request:", request);
      void fetchPredictions(request);
    },
    [fetchPredictions, requestOptions, sessionToken]
  );

  console.log("predictionResults", predictionResults);

  return (
    <div className="w-full">
      <Combobox
        as="div"
        value={inputValue}
        onChange={setSelected}
        // disabled={!ready}
      >
        <div className="relative">
          <Combobox.Input
            className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onChange={onInputChange}
            displayValue={() => inputValue}
            placeholder="Search for a place"
            autoComplete="off"
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>

          {!fetchingData && (
            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {predictionResults.map(({ place_id, description }) => (
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
  );
};

export default PlacesAutoComplete;
