import AutocompletePrediction = google.maps.places.AutocompletePrediction;
import AutocompleteRequest = google.maps.places.AutocompletionRequest;
import AutoCompleteService = google.maps.places.AutocompleteService;
import AutocompleteSessionToken = google.maps.places.AutocompleteSessionToken;
import Place = google.maps.places.Place;
import PlacePhoto = google.maps.places.PlacePhoto;
import PlaceResult = google.maps.places.PlaceResult;
import PlaceSearchStatus = google.maps.places.PlacesServiceStatus;
import PlacesService = google.maps.places.PlacesService;

// https://developers.google.com/maps/documentation/places/web-service/search-nearby#nearby-search-responses
interface NearbySearchResponse {
  html_attributions: string[];
  results: PlaceResult[];
  status: PlaceSearchStatus;
  error_message?: string;
  info_messages?: string[];
  next_page_token?: string;
}

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
  NearbySearchResponse,
  Place,
  PlaceNew,
  PlacePhoto,
  PlaceResult,
  PlaceResultWithLatLng,
  PlacesService,
};
