import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
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
        <body>
          <div
            className={`h-full bg-white font-sans tracking-tight text-gray-900 antialiased ${inter.variable} flex min-h-screen flex-col`}
          >
            <Header />
            <main className=" overflow-hiddensupports-[overflow:clip]:overflow-clip flex-1">
              <Toaster position="bottom-center" />

              {/* Main Content */}
              <TRPCReactProvider>{children}</TRPCReactProvider>

              {/* Grow the page so that footer is at bottom of page if there is no scroll */}
              <div className="flex-grow" />
            </main>

            <Footer />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
