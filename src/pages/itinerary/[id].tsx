import { type GetStaticProps } from "next";
import { type ReactElement } from "react";
import { type NextPageWithLayout } from "../_app";

import { Itinerary, RootLayout } from "~/components";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { api } from "~/utils/api";

interface ParsedAIMessageInterface {
  dayOfWeek: string;
  date: string;
  morning: string;
  afternoon: string;
  evening: string;
}

const ItineraryPage: NextPageWithLayout<{ itineraryID: string }> = ({
  itineraryID,
}) => {
  console.log("itineraryID", itineraryID);
  const { data } = api.itinerary.getByID.useQuery({ id: itineraryID });

  const parsedData = data?.details as ParsedAIMessageInterface[] | undefined;

  console.log("Itinerary data", data);

  return (
    <div>
      <Itinerary parsedData={parsedData ?? []} />
    </div>
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
