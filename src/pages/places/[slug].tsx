import { APIProvider as GoogleAPIProvider } from "@vis.gl/react-google-maps";
import type { GetStaticProps } from "next";
import React, { type ReactElement } from "react";
import { api } from "~/utils/api";

import { LoadingPage, PlacesProfile } from "~/components";
import PageLayout from "~/components/layout/Page";
import { slugToDatabaseName } from "~/lib/utils";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { type NextPageWithLayout } from "~/types/pages";

const PlacePage: NextPageWithLayout<{ placeName: string }> = ({
  placeName,
}) => {
  const {
    data: databaseData,
    isFetching,
    isInitialLoading,
  } = api.attractions.getByName.useQuery({
    name: slugToDatabaseName(placeName),
  });

  if ((isFetching && !databaseData) || isInitialLoading) return <LoadingPage />;
  return (
    <GoogleAPIProvider apiKey={process.env.GOOGLE_DETAILS_API_KEY ?? ""}>
      <main className="">
        <PlacesProfile databaseData={databaseData} />
      </main>
    </GoogleAPIProvider>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();

  const slug = context.params?.slug;

  if (typeof slug !== "string") throw new Error("no slug");

  const placeName = slug.replace("@", "");
  const databaseName = slugToDatabaseName(placeName);

  await ssg.attractions.getByName.prefetch({ name: databaseName });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      placeName,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

PlacePage.getLayout = function getLayout(page: ReactElement) {
  return <PageLayout>{page}</PageLayout>;
};

export default PlacePage;
