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

  const { data: user } = api.profile.getUserById.useQuery({ userId });

  console.log("user", user);

  console.log("itinerariesByUser", itinerariesByUser);

  return (
    <main className="flex w-full flex-col items-center px-2">
      <div className="relative flex w-full items-center justify-center">
        <h1 className="my-4 text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          {userId}
        </h1>
      </div>
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
