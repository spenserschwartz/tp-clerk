import { type ReactElement } from "react";
import { type NextPageWithLayout } from "../_app";

import { QuickLaunch, RootLayout } from "~/components";

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
