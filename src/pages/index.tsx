import { type ReactElement } from "react";

import { Features, FeaturesQuickLaunch, Hero, RootLayout } from "~/components";

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
