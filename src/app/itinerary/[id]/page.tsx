import { SignedIn, useUser } from "@clerk/nextjs";
import { type GetStaticProps } from "next";

import { useState, type ReactElement } from "react";
import { api } from "~/trpc/server";
// import { api } from "~/trpc/react";

import { Itinerary, ItineraryNotes, ItineraryTitle } from "@/components";
import { DeleteItineraryModal } from "@/modals";

// const ItineraryPage = ({params: {itineraryID}}) => {
//   return <div>ItineraryPage</div>;
// };

// export default ItineraryPage;

export default async function ItineraryPage({
  params,
}: {
  params: { id: string };
}) {
  // const data = api.itinerary.getByID({ id: params.id });
  const data = await api.city.getAll();

  return (
    <div>
      <p>{`Id: ${params.id}`}</p>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
}
