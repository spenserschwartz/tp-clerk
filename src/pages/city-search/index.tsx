import { APIProvider as GoogleAPIProvider } from "@vis.gl/react-google-maps";
import { type ReactElement } from "react";
import { type NextPageWithLayout } from "~/types/pages";

import { CitySearch, LoadingPage } from "~/components";
import { HomeLayout } from "~/components/layout";

const CitySearchPage: NextPageWithLayout = () => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!apiKey) return <LoadingPage />;
  return (
    <GoogleAPIProvider apiKey={apiKey}>
      <CitySearch />
    </GoogleAPIProvider>
  );
};

CitySearchPage.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>;
};

export default CitySearchPage;
