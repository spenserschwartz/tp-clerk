import AutocompletePrediction = google.maps.places.AutocompletePrediction;
import AutocompleteRequest = google.maps.places.AutocompletionRequest;
import AutoCompleteService = google.maps.places.AutocompleteService;
import AutocompleteSessionToken = google.maps.places.AutocompleteSessionToken;
import Place = google.maps.places.Place;
import PlacePhoto = google.maps.places.PlacePhoto;
import PlaceResult = google.maps.places.PlaceResult;
import PlacesService = google.maps.places.PlacesService;

interface PlaceNew extends Place {
  websiteUri: string;
}

interface PlaceResultWithLatLng extends Omit<PlaceResult, "geometry"> {
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}

enum RequestOptionType {
  Establishment = "ESTABLISHMENT",
  Cities = "CITIES",
}

export { RequestOptionType };
export type {
  AutoCompleteService,
  AutocompletePrediction,
  AutocompleteRequest,
  AutocompleteSessionToken,
  Place,
  PlaceNew,
  PlacePhoto,
  PlaceResult,
  PlaceResultWithLatLng,
  PlacesService,
};
