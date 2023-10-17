import { type ReactElement } from "react";

import Features from "~/components/features";
import FeaturesQuickLaunch from "~/components/features-quickLaunch";
import Hero from "~/components/hero";
import { RootLayout } from "~/components/layout";

const Home = () => {
  return (
    <>
      <Hero />
      <Features />
      <FeaturesQuickLaunch />
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default Home;
