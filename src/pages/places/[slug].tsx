import { Wrapper as GoogleMapsWrapper } from "@googlemaps/react-wrapper";
import type { GetStaticProps } from "next";
import React, { type ReactElement } from "react";
import { api } from "~/utils/api";

import { LoadingPage, PlacesProfile } from "~/components";
import PageLayout from "~/components/layout/Page";
import { slugToDatabaseName } from "~/lib/utils";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { type NextPageWithLayout } from "~/types/pages";
import { googleMapsRender } from "~/utils/google";

const PlacePage: NextPageWithLayout<{ placeName: string }> = ({
  placeName,
}) => {
  const {
    data: databaseData,
    isFetching,
    isLoading,
    isInitialLoading,
  } = api.attractions.getByName.useQuery({
    name: slugToDatabaseName(placeName),
  });

  if (isFetching || isLoading || isInitialLoading) return <LoadingPage />;
  return (
    <GoogleMapsWrapper
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ""}
      libraries={["places"]}
      render={googleMapsRender}
    >
      <main className="">
        <PlacesProfile databaseData={databaseData} />
      </main>
    </GoogleMapsWrapper>
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
