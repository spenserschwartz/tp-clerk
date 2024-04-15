"use client";
import { TextEditor } from "@/components/tiptap";
import { FadeUpWrapper } from "@/framer-motion";
import type { ItineraryWithCityInfoType } from "~/types/router";

interface ItineraryNotesProps {
  data: ItineraryWithCityInfoType;
}

const ItineraryNotes = ({ data }: ItineraryNotesProps) => {
  return (
    <div className="mt-10">
      <FadeUpWrapper>
        <TextEditor data={data} />
      </FadeUpWrapper>
    </div>
  );
};

export default ItineraryNotes;
