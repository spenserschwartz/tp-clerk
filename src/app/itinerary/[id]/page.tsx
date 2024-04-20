import {
  DeleteItinerary,
  Itinerary,
  ItineraryNotes,
  ItineraryTitle,
} from "@/components";
import { revalidatePath } from "next/cache";
import { api } from "~/trpc/server";

async function ItineraryPage({ params }: { params: { id: string } }) {
  const data = await api.itinerary.getByID({ id: params.id });

  const revalidate = async () => {
    "use server";
    revalidatePath("/itinerary/[id]", "page");
    revalidatePath("/user/[id]", "page");
  };

  if (!data) return <div>Itinerary not found</div>;
  return (
    <div className="flex flex-col items-center">
      <ItineraryTitle data={data} revalidate={revalidate} />

      <Itinerary data={data} />

      <ItineraryNotes data={data} />

      <DeleteItinerary data={data} />
    </div>
  );
}

export default ItineraryPage;
