import { type ReactElement } from "react";
import { type NextPageWithLayout } from "../_app";

import { RootLayout } from "~/components";

const ItineraryPage: NextPageWithLayout = () => {
  return <div>Itinerary Page</div>;
};

ItineraryPage.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default ItineraryPage;
