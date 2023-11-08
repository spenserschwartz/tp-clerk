import { type NextPage } from "next";
import { type ReactElement, type ReactNode } from "react";

// Used for getLayout on Next
export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
