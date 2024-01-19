import { TextEditor } from "~/components";
import type { ItineraryWithCityInfoType } from "~/types/router";

interface ItineraryNotesProps {
  data: ItineraryWithCityInfoType;
}

const ItineraryNotes = ({ data }: ItineraryNotesProps) => {
  return (
    <div className="mt-10">
      <TextEditor data={data} />
    </div>
  );
};

export default ItineraryNotes;
