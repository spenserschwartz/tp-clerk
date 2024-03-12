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
    const { formatted_address, place_id } = city ?? {};
    if (!formatted_address) return;

    const dynamicRoute = convertFormattedAddressToUrlPath(formatted_address);
    // void router.push("/things-to-do" + dynamicRoute);
    void router.push({
      pathname: "/things-to-do" + dynamicRoute,
      query: { place_id },
    });
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
