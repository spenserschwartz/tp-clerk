import { Breadcrumbs } from "@/components/layout";
import "~/styles/globals.css";

export const metadata = {
  title: "TravelPerfect",
  description: "Make the perfect itinerary",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function CityPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="px-2 md:px-10 lg:px-20">
      <Breadcrumbs />
      {children}
    </div>
  );
}
