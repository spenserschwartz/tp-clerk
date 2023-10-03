import { type NextPage } from "next";
import Head from "next/head";
import type { AppProps, AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import { type ReactElement, type ReactNode } from "react";

import { api } from "~/utils/api";
import "~/styles/globals.css";

// Used for getLayout on Next
export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
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
      <Toaster position="bottom-center" />

      {getLayout(<Component {...pageProps} />)}
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
