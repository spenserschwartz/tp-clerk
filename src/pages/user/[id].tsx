import { type GetStaticProps } from "next";
import React, { type ReactElement } from "react";
import { api } from "~/utils/api";

import { ItineraryImageGrid, RootLayout } from "~/components";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import type { NextPageWithLayout } from "~/types/pages";
import type { ItineraryWithCityInfoType } from "~/types/router";

const UserPage: NextPageWithLayout<{ userId: string }> = ({ userId }) => {
  const { data: itinerariesByUser } = api.itinerary.getByUserId.useQuery({
    userId,
  });

  console.log("itinerariesByUser", itinerariesByUser);

  return (
    <main>
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
