import { type GetStaticProps } from "next";
import { type ReactElement } from "react";
import { type NextPageWithLayout } from "~/types/pages";
import { api } from "~/utils/api";

import { Itinerary, RootLayout } from "~/components";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { type ParsedAIMessageInterface } from "~/types";

const ItineraryPage: NextPageWithLayout<{ itineraryID: string }> = ({
  itineraryID,
}) => {
  const { data } = api.itinerary.getByID.useQuery({ id: itineraryID });

  const parsedData = data?.details as ParsedAIMessageInterface[] | undefined;

  if (!data) return <div>404 Itinerary Not Found</div>;

  return (
    <main className="flex flex-col items-center">
      <h1 className="my-4 text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        Itinerary # {itineraryID}
      </h1>
      <Itinerary parsedData={parsedData ?? []} />
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
