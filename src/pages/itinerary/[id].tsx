import { SignedIn, useUser } from "@clerk/nextjs";
import { type GetStaticProps } from "next";
import { useState, type ReactElement } from "react";
import { type NextPageWithLayout } from "~/types/pages";
import { api } from "~/utils/api";

import { Itinerary, RootLayout } from "~/components";
import Avatar from "~/components/avatar";
import DeleteItinerary from "~/components/modal/deleteItinerary";
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
  const itineraryUserId = data?.userId ?? "";
  const parsedData = data?.details as ParsedAIMessageInterface[] | undefined;
  const itineraryName = `${numberOfDays} days in ${data?.city.name}`;

  if (!data) return <div>404 Itinerary Not Found</div>;

  return (
    <main className="flex flex-col items-center">
      <h1 className="my-4 w-full text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        <p className="truncate">{itineraryName}</p>
      </h1>
      <div>
        <Avatar userId={itineraryUserId} />
      </div>
      <Itinerary parsedData={parsedData ?? []} />

      {/* User can only delete itinerary if they are the current user */}
      <SignedIn>
        {userId === itineraryUserId && (
          <button
            className={`rounded bg-red-600 px-4 py-1 text-white hover:bg-red-700 ${
              isDeletingItinerary && "cursor-not-allowed opacity-50"
            }`}
            onClick={() => setOpenModal(true)}
            disabled={isDeletingItinerary}
          >
            Delete Itinerary
          </button>
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
