import { type ReactElement } from "react";

import { Features, FeaturesQuickLaunch, Hero } from "~/components";
import HomeLayout from "~/components/layout/Home";

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
  return <HomeLayout>{page}</HomeLayout>;
};

export default Home;
