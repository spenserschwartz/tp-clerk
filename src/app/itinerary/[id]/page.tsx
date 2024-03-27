import { SignedIn, useUser } from "@clerk/nextjs";
import { type GetStaticProps } from "next";

import { useState, type ReactElement } from "react";
import { api } from "~/trpc/server";
// import { api } from "~/trpc/react";

import { Itinerary, ItineraryNotes, ItineraryTitle } from "@/components";
import { DeleteItineraryModal } from "@/modals";

export default async function ItineraryPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await api.itinerary.getByID({ id: params.id });

  return (
    <main className="flex flex-col items-center">
      {/* <ItineraryTitle itineraryID={params.id} /> */}
      <p>{`Id: ${params.id}`}</p>
      <p>{JSON.stringify(data)}</p>
    </main>
  );
}
