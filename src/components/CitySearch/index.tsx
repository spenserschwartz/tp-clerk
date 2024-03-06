import { useRouter } from "next/router";
import type { AutocompleteRequest, PlaceResult } from "~/types/google";

import { PlacesAutoComplete } from "~/components";
import { convertFormattedAddressToUrlPath } from "~/utils/common";

const CitySearch = () => {
  const router = useRouter();

  const autocompleteRequest: AutocompleteRequest = {
    input: "",
    types: ["(cities)"],
  };

  // Route to the dynamic city page
  const handleSelectCity = (city: PlaceResult | null) => {
    // Make a dynamic route to the city's page
    const { formatted_address } = city ?? {};
    if (!formatted_address) return;

    const dynamicRoute = convertFormattedAddressToUrlPath(formatted_address);
    void router.push("/things-to-do" + dynamicRoute);
  };

  return (
    <div>
      <PlacesAutoComplete
        requestOptions={autocompleteRequest}
        setSelected={handleSelectCity}
      />
    </div>
  );
};

export default CitySearch;
