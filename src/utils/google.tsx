import { Status as GoogleMapsStatus } from "@googlemaps/react-wrapper";
import { type ReactElement } from "react";

export const googleMapsRender = (status: GoogleMapsStatus): ReactElement => {
  if (status === GoogleMapsStatus.FAILURE) return <div>Error</div>;
  return <div>Loading..</div>;
};
