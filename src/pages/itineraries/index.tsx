import { type ReactElement } from "react";
import { type NextPageWithLayout } from "~/types/pages";
import { api } from "~/utils/api";

import { RootLayout } from "~/components";

const ItinerariesPage: NextPageWithLayout = () => {
  const { data } = api.itinerary.getAll.useQuery();

  console.log("data here", data);

  return <div>ItinerariesPage</div>;
};

ItinerariesPage.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default ItinerariesPage;
