import { SignedIn, useUser } from "@clerk/nextjs";
import { type GetStaticProps } from "next";
import { useState, type ReactElement } from "react";

import { Itinerary, ItineraryNotes, ItineraryTitle } from "@/components";
import { DeleteItineraryModal } from "@/modals";

// const ItineraryPage = ({params: {itineraryID}}) => {
//   return <div>ItineraryPage</div>;
// };

// export default ItineraryPage;

export default function ItineraryPage({ params }: { params: { id: string } }) {
  return <div>{`Id: ${params.id}`}</div>;
}
