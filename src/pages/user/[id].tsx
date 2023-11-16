import { type GetStaticProps } from "next";
import React, { type ReactElement } from "react";
import { Itinerary, RootLayout } from "~/components";
import ItineraryImageGrid from "~/components/itineraryImageGrid";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import type { ParsedAIMessageInterface } from "~/types";
import { type NextPageWithLayout } from "~/types/pages";
import { ItineraryWithCityInfoType } from "~/types/router";
import { api } from "~/utils/api";

const UserPage: NextPageWithLayout<{ userId: string }> = ({ userId }) => {
  const { data: itinerariesByUser } = api.itinerary.getByUserId.useQuery({
    userId,
  });

  console.log("itinerariesByUser", itinerariesByUser);

  return (
    <main>
      {/* {itinerariesByUser?.map((itinerary) => {
        const parsedData =
          itinerary.details as unknown as ParsedAIMessageInterface[];

        return (
          <div key={itinerary.id}>
            <h1>{itinerary.id}</h1>
            <Itinerary parsedData={parsedData} />
          </div>
        );
      })} */}
      <ItineraryImageGrid
        itineraries={itinerariesByUser as ItineraryWithCityInfoType[]}
      />
    </main>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();

  const id = context.params?.id;

  if (typeof id !== "string") throw new Error("no id");

  const userId = id.replace("@", "");

  await ssg.profile.getUserById.prefetch({ userId });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      userId,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

UserPage.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
export default UserPage;
