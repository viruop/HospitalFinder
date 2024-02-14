export type PlacesAPIResponse = {
  html_attributions: any[];
  next_page_token: string;
  results: Result[];
  status: string;
};

export type Result = {
  business_status: BusinessStatus;
  geometry: Geometry;
  icon: string;
  icon_background_color: IconBackgroundColor;
  icon_mask_base_uri: string;
  name: string;
  opening_hours?: OpeningHours;
  place_id: string;
  plus_code?: PlusCode;
  rating?: number;
  reference: string;
  scope: Scope;
  types: Type[];
  user_ratings_total?: number;
  vicinity: string;
  photos?: Photo[];
};

export type BusinessStatus = "OPERATIONAL";

export type Geometry = {
  location: Location;
  viewport: Viewport;
};

export type Location = {
  lat: number;
  lng: number;
};

export type Viewport = {
  northeast: Location;
  southwest: Location;
};

export type IconBackgroundColor = "#7B9EB0" | "#F88181";

export type OpeningHours = {
  open_now: boolean;
};

export type Photo = {
  height: number;
  html_attributions: string[];
  photo_reference: string;
  width: number;
};

export type PlusCode = {
  compound_code: string;
  global_code: string;
};

export type Scope = "GOOGLE";

export type Type =
  | "doctor"
  | "hospital"
  | "health"
  | "point_of_interest"
  | "establishment"
  | "physiotherapist"
  | "store";
