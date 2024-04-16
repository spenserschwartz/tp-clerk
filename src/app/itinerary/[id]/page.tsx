"use client";
import {
  DeleteItinerary,
  Itinerary,
  ItineraryNotes,
  ItineraryTitle,
  LoadingPage,
} from "@/components";
// import { api } from "~/trpc/server";
import { api } from "~/trpc/react";

export default function ItineraryPage({ params }: { params: { id: string } }) {
  // const data = await api.itinerary.getByID({ id: params.id });
  const { data, isLoading } = api.itinerary.getByID.useQuery({ id: params.id });

  if (isLoading) return <LoadingPage />;
  if (!data) return <div>Itinerary not found</div>;
  return (
    <div className="flex flex-col items-center">
      <ItineraryTitle data={data} />

      <Itinerary data={data} />

      <ItineraryNotes data={data} />

      <DeleteItinerary data={data} />
    </div>
  );
}
