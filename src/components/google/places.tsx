import {
  GoogleMap,
  Marker,
  useLoadScript,
  type Libraries,
} from "@react-google-maps/api";
import { useEffect, useMemo, useState } from "react";

import PlacesAutoComplete from "./placesAutoComplete";

// TODO: Ready to be used for more Google Maps components
const GooglePlaces = () => {
  const libraries: Libraries = ["places"];
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
    libraries,
  });

  if (!isLoaded) return <div>Loading...</div>;

  return <Map />;
};

function Map() {
  const center = useMemo(() => ({ lat: 44, lng: -80 }), []);
  const [selected, setSelected] = useState<string | null>(null); //place_id

  console.log("selected", selected);

  return (
    <>
      <div>
        <PlacesAutoComplete setSelected={setSelected} />
      </div>
    </>
  );
}

export default GooglePlaces;
