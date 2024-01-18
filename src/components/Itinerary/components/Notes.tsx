import { useState } from "react";
import { TextEditor } from "~/components";
import type { ItineraryWithCityInfoType } from "~/types/router";

interface ItineraryNotesProps {
  data: ItineraryWithCityInfoType;
  notes: string;
}

const ItineraryNotes = ({ data, notes }: ItineraryNotesProps) => {
  const [editable, setEditable] = useState(false);

  return (
    <div className="mt-10">
      <button
        className={`rounded bg-blue-600 px-4 py-1 text-white hover:bg-blue-700`}
        onClick={() => setEditable(!editable)}
      >
        Edit Notes
      </button>

      <TextEditor editable={editable} content={notes} data={data} />
    </div>
  );
};

export default ItineraryNotes;
