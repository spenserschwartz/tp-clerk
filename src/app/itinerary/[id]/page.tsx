import { useState, type ReactElement } from "react";
import { api } from "~/trpc/server";
// import { api } from "~/trpc/react";

import {
  DeleteItinerary,
  Itinerary,
  ItineraryNotes,
  ItineraryTitle,
} from "@/components";
import { DeleteItineraryModal } from "@/modals";
import type { ParsedAIMessageInterface } from "~/types/openai";

export default async function ItineraryPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await api.itinerary.getByID({ id: params.id });

  return (
    <main className="flex flex-col items-center">
      <ItineraryTitle data={data} />

      <Itinerary data={data} />

      <ItineraryNotes data={data} />

      <DeleteItinerary data={data} />

      <p>{`Id: ${params.id}`}</p>
    </main>
  );
}
