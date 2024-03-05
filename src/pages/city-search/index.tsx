import { APIProvider as GoogleAPIProvider } from "@vis.gl/react-google-maps";
import { useState, type ReactElement } from "react";
import type { AutocompleteRequest, PlaceResult } from "~/types/google";
import { type NextPageWithLayout } from "~/types/pages";

import { CitySearch, LoadingPage, PlacesAutoComplete } from "~/components";
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
