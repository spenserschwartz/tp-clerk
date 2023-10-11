import { type ReactElement } from "react";

import { LoadingPage } from "src/components/loading";
import Features from "~/components/features";
import FeaturesQuickLaunch from "~/components/features-quicklaunch";
import Hero from "~/components/hero";
import { RootLayout } from "~/components/layout";
import QuickLaunch from "~/components/quickLaunch";
import Footer from "~/components/ui/footer";

import { api } from "~/utils/api";

const Home = () => {
  const { data, isLoading } = api.city.getAll.useQuery();
  if (isLoading) return <LoadingPage />;

  const comboboxOptions = data?.map((city) => {
    return { name: city.name, id: city.id };
  }) ?? [{ name: "no cities found", id: "nocitiesfound" }];

  return (
    <>
      <Hero />
      <Features />
      <FeaturesQuickLaunch />

      <Footer />
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default Home;
