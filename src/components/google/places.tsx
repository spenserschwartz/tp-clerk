import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo, useState } from "react";
import usePlacesAutocomplete from "use-places-autocomplete";
import MyCombobox from "../combobox";
import PlacesAutoComplete from "./placesAutoComplete";

const GooglePlaces = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;

  return <Map />;
};

function Map() {
  const center = useMemo(() => ({ lat: 44, lng: -80 }), []);
  const [selected, setSelected] = useState<string | null>(null);

  console.log("selected", selected);

  return (
    <>
      <div>
        <PlacesAutoComplete setSelected={setSelected} />
      </div>

      {/* <GoogleMap
        zoom={10}
        center={center}
        mapContainerClassName="w-full h-full"
      >
        <Marker position={center} />
      </GoogleMap> */}
    </>
  );
}

export default GooglePlaces;
