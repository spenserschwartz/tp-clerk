import { ItineraryImageGrid } from "@/components";
import { api } from "~/trpc/server";

const ItinerariesPage = async () => {
  const allItineraries = await api.itinerary.getAllWithCityInfo();

  return (
    <main className="flex w-full flex-col items-center px-2">
      <div className="relative flex w-full items-center justify-center">
        <h1 className="my-4 text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          Itineraries
        </h1>
      </div>
      <ItineraryImageGrid itineraries={allItineraries ?? []} />
    </main>
  );
};

export default ItinerariesPage;
