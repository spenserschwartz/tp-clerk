import { TextEditor } from "~/components";
import type { ItineraryWithCityInfoType } from "~/types/router";

interface ItineraryNotesProps {
  data: ItineraryWithCityInfoType;
  notes: string;
}

const ItineraryNotes = ({ data, notes }: ItineraryNotesProps) => {
  return (
    <div className="mt-10">
      <TextEditor content={notes} data={data} />
    </div>
  );
};

export default ItineraryNotes;
