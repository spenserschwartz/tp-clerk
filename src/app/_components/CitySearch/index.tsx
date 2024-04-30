"use client";
import { APIProvider as GoogleAPIProvider } from "@vis.gl/react-google-maps";
import { useRouter } from "next/navigation";

import { LoadingPage, PlacesAutoComplete } from "@/components";
import { FadeUpWrapper } from "@/framer-motion";
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
    void router.push("/things-to-do" + dynamicRoute);
  };

  return (
    <GoogleAPIProvider apiKey={apiKey}>
      <section className="relative" id="quick_launch">
        <FadeUpWrapper>
          <div className="relative mx-auto flex max-w-6xl flex-col items-center px-3 sm:px-6">
            <div>
              {/* Section header */}
              <div className="mx-auto max-w-3xl pb-2 text-center md:pb-20">
                <h2 className="h2 mb-4">Search for Any City</h2>
                <p className="text-xl text-gray-600">
                  Find the best attractions for any city in the world and make
                  an itinerary in seconds.
                </p>
              </div>
            </div>
            <PlacesAutoComplete
              requestOptions={autocompleteRequest}
              setSelected={handleSelectCity}
            />
          </div>
        </FadeUpWrapper>
      </section>
    </GoogleAPIProvider>
  );
};

export default CitySearch;
