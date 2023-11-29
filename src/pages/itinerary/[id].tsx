import { SignedIn } from "@clerk/nextjs";
import { type GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState, type ReactElement } from "react";
import toast from "react-hot-toast";
import { type NextPageWithLayout } from "~/types/pages";
import { api } from "~/utils/api";

import { Itinerary, Modal, RootLayout } from "~/components";
import DeleteItinerary from "~/components/modal/deleteItinerary";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { type ParsedAIMessageInterface } from "~/types";
import { useDeleteItinerary } from "~/utils/hooks";

const ItineraryPage: NextPageWithLayout<{ itineraryID: string }> = ({
  itineraryID,
}) => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const { deleteItinerary, itineraryDeleted } = useDeleteItinerary();
  const { data } = api.itinerary.getByID.useQuery({ id: itineraryID });
  const details = data?.details as unknown as ParsedAIMessageInterface[];
  const { length: numberOfDays } = details;

  const parsedData = data?.details as ParsedAIMessageInterface[] | undefined;

  if (!data) return <div>404 Itinerary Not Found</div>;

  const itineraryName = `${numberOfDays} days in ${data.city.name}`;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (itineraryDeleted) {
      toast.success("Itinerary deleted. You will be redirected.");
      setTimeout(() => {
        router.back();
      }, 3000);
    }
  }, [itineraryDeleted, router]);

  return (
    <main className="flex flex-col items-center">
      <h1 className="my-4 w-full text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        <p className="truncate">{itineraryName}</p>
      </h1>
      <Itinerary parsedData={parsedData ?? []} />
      <SignedIn>
        <button
          className="rounded bg-red-600 px-4 py-1 text-white hover:bg-red-700"
          // onClick={() => deleteItinerary({ id: itineraryID })}
          onClick={() => setOpenModal(true)}
        >
          Delete Itinerary
        </button>
      </SignedIn>

      {/* <Modal
        content="DeleteItinerary"
        openModal={openModal}
        setOpenModal={setOpenModal}
      /> */}
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
