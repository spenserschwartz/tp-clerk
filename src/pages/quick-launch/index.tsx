import { type ReactElement } from "react";
import { RootLayout } from "~/components/layout";

import QuickLaunch from "~/components/quickLaunch";
import { type NextPageWithLayout } from "../_app";

const QuickLaunchPage: NextPageWithLayout = () => {
  return (
    <div className="mt-16">
      <QuickLaunch />
    </div>
  );
};

QuickLaunchPage.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default QuickLaunchPage;
