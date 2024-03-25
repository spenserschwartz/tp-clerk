import React from "react";
import { api } from "~/trpc/server";

const SplashPage = async () => {
  // const whatIsHere = await api.city.getAll();
  // const str = JSON.stringify(whatIsHere, null, 2);

  const allItineraries = await api.itinerary.getAll();
  const str = JSON.stringify(allItineraries, null, 2);

  return <div>{str}</div>;
};

export default SplashPage;
