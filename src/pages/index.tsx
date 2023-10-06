import { type ReactElement } from "react";

import { LoadingPage } from "src/components/loading";
import { RootLayout } from "~/components/layout";

import { api } from "~/utils/api";

const Home = () => {
  const { data, isLoading } = api.city.getAll.useQuery();
  if (isLoading) return <LoadingPage />;

  const comboboxOptions = data?.map((city) => {
    return { name: city.name, id: city.id };
  }) ?? [{ name: "no cities found", id: "nocitiesfound" }];

  return <>Home</>;
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default Home;
