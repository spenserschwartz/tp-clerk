import { ClerkProvider } from "@clerk/nextjs";
import type { AppProps, AppType } from "next/app";
import Head from "next/head";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import { api } from "~/utils/api";

import "~/styles/globals.css";
import { type NextPageWithLayout } from "~/types/pages";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp: AppType = ({ Component, pageProps }: AppPropsWithLayout) => {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ClerkProvider {...pageProps}>
      <Head>
        <title>TravelPerfect</title>
        <meta name="description" content="🚀" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NextTopLoader />

      <Toaster position="bottom-center" />

      {getLayout(<Component {...pageProps} />)}
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
