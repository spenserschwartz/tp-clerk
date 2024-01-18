import { useState } from "react";
import { TextEditor } from "~/components";

const ItineraryNotes = () => {
  const [editable, setEditable] = useState(false);

  console.log("editable", editable);
  return (
    <div className="mt-10">
      <button
        className={`rounded bg-blue-600 px-4 py-1 text-white hover:bg-blue-700`}
        onClick={() => setEditable(true)}
      >
        Edit Notes
      </button>

      <TextEditor editable={editable} />
    </div>
  );
};

export default ItineraryNotes;
