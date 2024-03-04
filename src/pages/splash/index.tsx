import { APIProvider as GoogleAPIProvider } from "@vis.gl/react-google-maps";
import { useState } from "react";
import { PlacesAutoComplete } from "~/components";
import { AutocompleteRequest, PlaceResult } from "~/types/google";

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const SlugPage = () => {
  const [selected, setSelected] = useState<PlaceResult | null>(null);
  const autocompleteRequest: AutocompleteRequest = {
    input: "",
    types: ["(cities)"],
  };

  console.log("selected", selected);

  return (
    <GoogleAPIProvider apiKey={apiKey ?? ""}>
      <PlacesAutoComplete
        setSelected={setSelected}
        requestOptions={autocompleteRequest}
      />
    </GoogleAPIProvider>
  );
};

export default SlugPage;
