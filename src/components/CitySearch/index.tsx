import { useState } from "react";
import type { AutocompleteRequest, PlaceResult } from "~/types/google";

import { PlacesAutoComplete } from "~/components";

const CitySearch = () => {
  const [selectedCity, setSelectedCity] = useState<PlaceResult | null>(null);
  const autocompleteRequest: AutocompleteRequest = {
    input: "",
    types: ["(cities)"],
  };

  // Route to the dynamic city page
  const handleSelectCity = (city: PlaceResult | null) => {
    console.log("handleSelectCity", city);
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
