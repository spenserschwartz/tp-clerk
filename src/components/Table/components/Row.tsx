import React from "react";

import { HeartIcon } from "~/icons";
import type { PlaceNew } from "~/types/google";

interface TableRowProps {
  place: PlaceNew;
}

const TableRow = ({ place }: TableRowProps) => {
  return (
    <tr key={place.id}>
      {/* Adjusted cells for ellipsis */}
      <td
        className="w-1/3 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
        style={{
          minWidth: "100px",
          maxWidth: "200px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {place.displayName?.text}
      </td>

      <td
        className="hidden px-3 py-4 text-sm text-gray-500 md:table-cell"
        style={{
          minWidth: "100px",
          maxWidth: "300px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {place.editorialSummary?.text}
      </td>
      <td className="relative py-4 text-right text-sm font-medium ">
        <div className="flex items-center justify-center">
          <HeartIcon enabled={false} />
          <span className="sr-only">
            Like Button for {place.displayName?.text}
          </span>
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
