import type { AppProps, AppType } from "next/app";
import Head from "next/head";
import { ClerkProvider } from "@clerk/nextjs";
import { api } from "~/utils/api";

import "~/styles/globals.css";
import { Toaster } from "react-hot-toast";
import { type NextPage } from "next";
import { type ReactElement, type ReactNode } from "react";

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
      {/* <PageLayout>
        <Component {...pageProps} />
      </PageLayout> */}
      {getLayout(<Component {...pageProps} />)}
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
