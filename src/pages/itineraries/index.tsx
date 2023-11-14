import { type ReactElement } from "react";
import { type NextPageWithLayout } from "~/types/pages";
import { api } from "~/utils/api";

import { RootLayout } from "~/components";

const ItinerariesPage: NextPageWithLayout = () => {
  const { data: allItineraries } = api.itinerary.getAllWithCityInfo.useQuery();

  console.log("allItineraries", allItineraries);

  return <div>ItinerariesPage</div>;
};

ItinerariesPage.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default ItinerariesPage;
