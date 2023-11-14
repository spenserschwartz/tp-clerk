import { type ReactElement } from "react";
import { type NextPageWithLayout } from "~/types/pages";
import { api } from "~/utils/api";

import Link from "next/link";
import { RootLayout } from "~/components";

const ItinerariesPage: NextPageWithLayout = () => {
  const { data: allItineraries } = api.itinerary.getAllWithCityInfo.useQuery();

  console.log("allItineraries", allItineraries);

  return (
    <main className="flex justify-center">
      <ul className="list-inside list-disc">
        {allItineraries?.map((itinerary) => {
          return (
            <li key={itinerary.id}>
              <Link href={`/itinerary/${itinerary.id}`}>{itinerary.id}</Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
};

ItinerariesPage.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default ItinerariesPage;
