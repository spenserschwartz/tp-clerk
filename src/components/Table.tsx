import { HeartIcon } from "~/icons";
import type { PlaceNew } from "~/types/google";

const people = [
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  // More people...
];

interface TableProps {
  places: PlaceNew[] | undefined;
}

export default function Table({ places }: TableProps) {
  console.log("places", places);
  if (!places) return null;
  return (
    <div className="mt-8 flow-root w-full">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className=" border border-red-500 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className=" border border-green-500 px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Description
                  </th>

                  <th
                    scope="col"
                    className="relative border border-blue-400 py-3.5 pl-3 pr-4 sm:pr-6"
                  >
                    <span className="sr-only">Like Button</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {places.map((place) => (
                  // <tr key={place.id}>
                  //   <td className="overflow-hidden text-ellipsis whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                  //     {place.displayName?.text}
                  //   </td>

                  //   <td className="text-ellipsis whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  //     {place.editorialSummary?.text}
                  //   </td>

                  //   <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  //     <div className="flex items-center justify-center">
                  //       <HeartIcon enabled={false} />
                  //       <span className="sr-only">
                  //         Like Button for {place.displayName?.text}
                  //       </span>
                  //     </div>
                  //   </td>
                  // </tr>
                  <tr key={place.id}>
                    {/* Adjusted cells for ellipsis */}
                    <td
                      className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
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
                      className="px-3 py-4 text-sm text-gray-500"
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
                    <td className="relative py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <div className="flex items-center justify-center">
                        <HeartIcon enabled={false} />
                        <span className="sr-only">
                          Like Button for {place.displayName?.text}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
