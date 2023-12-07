import { SignedIn, useUser } from "@clerk/nextjs";
import { type GetStaticProps } from "next";
import { ChangeEvent, useState, type ReactElement } from "react";
import { type NextPageWithLayout } from "~/types/pages";
import { api } from "~/utils/api";

import { PencilIcon } from "@heroicons/react/20/solid";
import { Itinerary, RootLayout } from "~/components";

import DeleteItinerary from "~/components/modal/deleteItinerary";
import PageHeader from "~/components/pageHeader";
import { unknownClerkUser } from "~/components/utils";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { type ParsedAIMessageInterface } from "~/types";
import { useDeleteItinerary } from "~/utils/hooks";

const ItineraryPage: NextPageWithLayout<{ itineraryID: string }> = ({
  itineraryID,
}) => {
  const { user } = useUser();
  const userId = user?.id;
  const [openModal, setOpenModal] = useState(false);
  const { isDeletingItinerary } = useDeleteItinerary();
  const { data } = api.itinerary.getByID.useQuery({ id: itineraryID });

  const details = data?.details as unknown as ParsedAIMessageInterface[];
  const { length: numberOfDays } = details;
  const itineraryUserId = data?.userId ?? unknownClerkUser.id;
  const parsedData = data?.details as ParsedAIMessageInterface[] | undefined;
  const itineraryName = `${numberOfDays} days in ${data?.city.name}`;

  const [isEditing, setEditing] = useState(false);
  const [text, setText] = useState("Notes");

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  if (!data) return <div>404 Itinerary Not Found</div>;

  console.log("data", data);

  return (
    <main className="flex flex-col items-center">
      {/* Itinerary Title */}
      <h1 className="relative flex items-center px-9 py-2 text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 hover:bg-gray-300 dark:text-white md:text-5xl lg:text-6xl">
        <p className="truncate">{itineraryName}</p>

        <div className="absolute right-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 text-gray-700 opacity-50 hover:bg-gray-500 hover:text-gray-900">
          <PencilIcon className="h-5 w-5" aria-hidden="true" />
        </div>
      </h1>

      <div className="group relative">
        <input
          type="text"
          value={text}
          onChange={handleTextChange}
          className="rounded-md border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onFocus={() => setEditing(true)}
          onBlur={() => setEditing(false)}
        />
        <div
          className={`absolute right-2 top-1/2 -translate-y-1/2 transform ${
            isEditing ? "hidden" : "group-hover:block"
          }`}
        ></div>
      </div>

      <Itinerary parsedData={parsedData ?? []} itineraryID={itineraryID} />

      {/* User can only delete itinerary if they are the current user */}
      <SignedIn>
        {userId === itineraryUserId && (
          <div className="mt-4">
            <button
              className={`rounded bg-red-600 px-4 py-1 text-white hover:bg-red-700 ${
                isDeletingItinerary && "cursor-not-allowed opacity-50"
              }`}
              onClick={() => setOpenModal(true)}
              disabled={isDeletingItinerary}
            >
              Delete Itinerary
            </button>
          </div>
        )}
      </SignedIn>

      {/* Modal */}
      <DeleteItinerary
        openModal={openModal}
        setOpenModal={setOpenModal}
        itineraryID={itineraryID}
      />
    </main>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();

  const id = context.params?.id;

  if (typeof id !== "string") throw new Error("no slug");

  const itineraryID = id.replace("@", "");

  //   await ssg.city.getCityByName.prefetch({ name: cityName });
  await ssg.itinerary.getByID.prefetch({ id: itineraryID });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      itineraryID,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

ItineraryPage.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default ItineraryPage;
