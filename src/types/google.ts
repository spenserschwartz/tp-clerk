import AutocompletePrediction = google.maps.places.AutocompletePrediction;
import AutocompleteRequest = google.maps.places.AutocompletionRequest;
import AutoCompleteService = google.maps.places.AutocompleteService;
import AutocompleteSessionToken = google.maps.places.AutocompleteSessionToken;

import Place = google.maps.places.Place;
import PlaceDetailsRequest = google.maps.places.PlaceDetailsRequest;
import PlacePhoto = google.maps.places.PlacePhoto;
import PlaceResult = google.maps.places.PlaceResult;
import PlaceSearchStatus = google.maps.places.PlacesServiceStatus;
import PlacesService = google.maps.places.PlacesService;

interface LatLng {
  lat: number;
  lng: number;
}

// https://developers.google.com/maps/documentation/places/web-service/reference/rest/v1/places#LocalizedText
interface LocalizedText {
  text: string;
  languageCode: string;
}

// https://developers.google.com/maps/documentation/places/web-service/search-nearby#nearby-search-responses
interface NearbySearchResponse {
  html_attributions: string[];
  results: PlaceResult[];
  status: PlaceSearchStatus;
  error_message?: string;
  info_messages?: string[];
  next_page_token?: string;
}

// https://developers.google.com/maps/documentation/places/web-service/nearby-search#about_response
interface NearbySearchNewResponse {
  places: PlaceNew[];
}

// interface PlaceNew extends Place {
//   websiteUri: string;
// }
interface PlaceNew
  extends Omit<
    Place,
    "editorialSummary" | "displayName" | "googleMapsURI" | "websiteURI"
  > {
  displayName: LocalizedText | null;
  editorialSummary?: LocalizedText | null;
  googleMapsUri: string; // adding the new property
  websiteUri: string; // adding the new property
}

interface PlaceResultWithLatLng extends Omit<PlaceResult, "geometry"> {
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}

interface PlacesTextSearchResponse {
  html_attributions: string[];
  results: PlaceResultWithLatLng[];
  status: PlaceSearchStatus;
  error_message?: string;
  info_messages?: string[];
  next_page_token?: string;
}

// * ENUMS
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
  LatLng,
  NearbySearchNewResponse,
  NearbySearchResponse,
  Place,
  PlaceDetailsRequest,
  PlaceNew,
  PlacePhoto,
  PlaceResult,
  PlaceResultWithLatLng,
  PlacesService,
  PlacesTextSearchResponse,
};
