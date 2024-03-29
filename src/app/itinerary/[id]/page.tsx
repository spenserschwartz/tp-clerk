import {
  DeleteItinerary,
  Itinerary,
  ItineraryNotes,
  ItineraryTitle,
} from "@/components";
import { api } from "~/trpc/server";

export default async function ItineraryPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await api.itinerary.getByID({ id: params.id });

  return (
    <div className="flex flex-col items-center">
      <ItineraryTitle data={data} />

      <Itinerary data={data} />

      <ItineraryNotes data={data} />

      <DeleteItinerary data={data} />
    </div>
  );
}
