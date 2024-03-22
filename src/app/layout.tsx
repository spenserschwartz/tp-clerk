import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "~/styles/globals.css";
import { TRPCReactProvider } from "~/trpc/react";

import { Footer, Header } from "@/components/layout";

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
      <html lang="en">
        <body className={`font-sans ${inter.variable}`}>
          {/* <TRPCReactProvider>{children}</TRPCReactProvider> */}
          <div className="bg-white tracking-tight text-gray-900 antialiased">
            <Header />
            <div className="flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
              {/* Spacing between header and main content */}
              <div className="mb-24 md:mb-20" />

              {/* Main Content */}
              <TRPCReactProvider>{children}</TRPCReactProvider>

              {/* Grow the page so that footer is at bottom of page if there is no scroll */}
              <div className="flex-grow"></div>
            </div>

            <Footer />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
