import AutocompleteRequest = google.maps.places.AutocompletionRequest;
import Place = google.maps.places.Place;
import PlacePhoto = google.maps.places.PlacePhoto;
import PlaceResult = google.maps.places.PlaceResult;

/*
  Custom interface made for Place Details (New) response
  https://developers.google.com/maps/documentation/places/web-service/place-details#required-parameters

  This is the type of response that we get from the Google Place Details API
  https://developers.google.com/maps/documentation/places/web-service/reference/rest/v1/places
*/
interface PlaceDetailsNewResponse {
  accessibilityOptions?: AccessibilityOptions;
  addressComponents?: AddressComponent[];
  adrFormatAddress?: string;
  businessStatus?: string;
  currentOpeningHours?: CurrentOpeningHours;
  displayName?: DisplayName;
  editorialSummary?: EditorialSummary;
  formattedAddress?: string;
  googleMapsUri?: string;
  iconBackgroundColor?: string;
  iconMaskBaseUri?: string;
  id?: string;
  internationalPhoneNumber?: string;
  location?: Location;
  name?: string;
  nationalPhoneNumber?: string;
  photos?: Photo[];
  plusCode?: PlusCode;
  rating?: number;
  regularOpeningHours?: RegularOpeningHours;
  reviews?: Review[];
  shortFormattedAddress?: string;
  types?: string[];
  userRatingCount?: number;
  utcOffsetMinutes?: number;
  viewport?: Viewport;
  websiteUri?: string;
}

interface AddressComponent {
  languageCode?: string;
  longText?: string;
  shortText?: string;
  types?: string[];
}

interface AuthorAttribution {
  displayName?: string;
  photoUri?: string;
  uri?: string;
}

interface CurrentOpeningHours {
  openNow?: boolean;
  periods?: Period[];
  weekdayDescriptions?: string[];
}

interface DateDetail {
  day?: number;
  month?: number;
  year?: number;
}

interface DisplayName {
  languageCode?: string;
  text?: string;
}

interface EditorialSummary {
  languageCode?: string;
  text?: string;
}

interface Location {
  latitude?: number;
  longitude?: number;
}

interface OpeningDetail {
  date?: DateDetail;
  day?: number;
  hour?: number;
  minute?: number;
}

interface Period {
  close?: OpeningDetail;
  open?: OpeningDetail;
}

interface Photo {
  authorAttributions?: AuthorAttribution[];
  heightPx?: number;
  name?: string;
  widthPx?: number;
}

interface PlusCode {
  compoundCode?: string;
  globalCode?: string;
}

interface RegularOpeningHours {
  openNow?: boolean;
  periods?: Period[];
  weekdayDescriptions?: string[];
}

interface Review {
  authorAttribution?: AuthorAttribution;
  name?: string;
  originalText?: Text;
  publishTime?: string;
  rating?: number;
  relativePublishTimeDescription?: string;
  text?: Text;
}

interface Text {
  languageCode?: string;
  text?: string;
}

interface Viewport {
  high?: Location;
  low?: Location;
}

interface AccessibilityOptions {
  wheelchairAccessibleEntrance?: boolean;
  wheelchairAccessibleParking?: boolean;
}

// ***

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
  AutocompleteRequest,
  Place,
  PlaceDetailsNewResponse,
  PlacePhoto,
  PlaceResult,
  PlaceResultWithLatLng,
};
