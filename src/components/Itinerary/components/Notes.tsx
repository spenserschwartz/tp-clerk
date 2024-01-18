import { useState } from "react";
import { TextEditor } from "~/components";

interface ItineraryNotesProps {
  notes: string;
}

const ItineraryNotes = ({ notes }: ItineraryNotesProps) => {
  const [editable, setEditable] = useState(false);

  return (
    <div className="mt-10">
      <button
        className={`rounded bg-blue-600 px-4 py-1 text-white hover:bg-blue-700`}
        onClick={() => setEditable(!editable)}
      >
        Edit Notes
      </button>

      <TextEditor editable={editable} content={notes} />
    </div>
  );
};

export default ItineraryNotes;
