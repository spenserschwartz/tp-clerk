import { useState } from "react";
import { TextEditor } from "~/components";

const ItineraryNotes = () => {
  const [editable, setEditable] = useState(false);
  return (
    <div className="mt-10">
      <TextEditor editable={editable} />
    </div>
  );
};

export default ItineraryNotes;
