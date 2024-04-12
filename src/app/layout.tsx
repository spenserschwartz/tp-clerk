import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import { TRPCReactProvider } from "~/trpc/react";

import { Footer, Header, MainWrapper } from "@/components/layout";
import "~/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "TravelPerfect",
  description: "Make the perfect itinerary",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <TRPCReactProvider>
        <html lang="en">
          <body>
            <NextTopLoader />

            <div
              className={`h-full bg-white font-sans tracking-tight text-gray-900 antialiased ${inter.variable} flex min-h-screen flex-col`}
            >
              <Header />

              <MainWrapper>
                <Toaster position="bottom-center" />

                {/* Main Content */}
                {children}

                {/* Grow the page so that footer is at bottom of page if there is no scroll */}
                <div className="flex-grow" />
              </MainWrapper>

              <Footer />
            </div>
          </body>
        </html>
      </TRPCReactProvider>
    </ClerkProvider>
  );
}
