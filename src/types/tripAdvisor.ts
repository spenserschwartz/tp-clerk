export interface LocationDetails {
  address_obj: AddressObject;
  ancestors: Ancestor[];
  awards: Award[];
  category: Category;
  description: string;
  email: string;
  groups: Group[];
  hours: Hours;
  latitude: string;
  location_id: string;
  longitude: string;
  name: string;
  neighborhood_info: NeighborhoodInfo[];
  num_reviews: string;
  phone: string;
  photo_count: string;
  ranking_data: RankingData;
  rating: string;
  rating_image_url: string;
  review_rating_count: Record<string, string>;
  see_all_photos: string;
  subcategory: Category[];
  timezone: string;
  trip_types: TripType[];
  web_url: string;
  website: string;
  write_review: string;
}

interface AddressObject {
  street1: string;
  city: string;
  country: string;
  postalcode: string;
  address_string: string;
}

interface Ancestor {
  level: string;
  name: string;
  location_id: string;
}

interface RankingData {
  geo_location_id: string;
  ranking_string: string;
  geo_location_name: string;
  ranking_out_of: string;
  ranking: string;
}

interface Hours {
  periods: Period[];
  weekday_text: string[];
}

interface Period {
  open: DayTime;
  close: DayTime;
}

interface DayTime {
  day: number;
  time: string;
}

interface Category {
  name: string;
  localized_name: string;
}

interface Group {
  name: string;
  localized_name: string;
  categories: Category[];
}

interface NeighborhoodInfo {
  location_id: string;
  name: string;
}

interface TripType {
  name: string;
  localized_name: string;
  value: string;
}

interface Award {
  award_type: string;
  year: string;
  images: {
    tiny: string;
    small: string;
    large: string;
  };
  categories: string[];
  display_name: string;
}
