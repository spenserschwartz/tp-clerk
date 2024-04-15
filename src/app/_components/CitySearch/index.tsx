"use client";
import { APIProvider as GoogleAPIProvider } from "@vis.gl/react-google-maps";
import { useRouter } from "next/navigation";

import { LoadingPage, PlacesAutoComplete } from "@/components";
import { convertFormattedAddressToUrlPath } from "~/lib/utils";
import type { AutocompleteRequest, PlaceResult } from "~/types/google";

const CitySearch = () => {
  const router = useRouter();
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!apiKey) return <LoadingPage />;

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
    // void router.push("/things-to-do" + dynamicRoute);
    // void router.push({
    //   pathname: "/things-to-do" + dynamicRoute,
    // });
    void router.push("/things-to-do" + dynamicRoute);
  };

  return (
    <GoogleAPIProvider apiKey={apiKey}>
      <PlacesAutoComplete
        requestOptions={autocompleteRequest}
        setSelected={handleSelectCity}
      />
    </GoogleAPIProvider>
  );
};

export default CitySearch;
