import { SignedIn, useUser } from "@clerk/nextjs";
import { type GetStaticProps } from "next";
import { useState, type ReactElement } from "react";

import { Itinerary, ItineraryNotes, ItineraryTitle } from "@/components";
import { DeleteItineraryModal } from "@/modals";

const ItineraryPage = () => {
  return <div>ItineraryPage</div>;
};

export default ItineraryPage;
