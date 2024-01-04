import AutocompleteRequest = google.maps.places.AutocompletionRequest;
import PlacePhoto = google.maps.places.PlacePhoto;
import PlaceResult = google.maps.places.PlaceResult;

enum RequestOptionType {
  Establishment = "ESTABLISHMENT",
  Cities = "CITIES",
}

export { RequestOptionType };
export type { AutocompleteRequest, PlacePhoto, PlaceResult };
