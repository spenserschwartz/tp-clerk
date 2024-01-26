import { Wrapper as GoogleMapsWrapper } from "@googlemaps/react-wrapper";
import type { GetStaticProps } from "next";
import React, { type ReactElement } from "react";

import { RootLayout } from "~/components";
import PlacesProfile from "~/components/profiles/place";
import { slugToDatabaseName } from "~/lib/utils";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { type NextPageWithLayout } from "~/types/pages";
import { googleMapsRender } from "~/utils/google";

const PlacePage: NextPageWithLayout<{ placeName: string }> = ({
  placeName,
}) => {
  return (
    <GoogleMapsWrapper
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ""}
      libraries={["places"]}
      render={googleMapsRender}
    >
      <PlacesProfile placeName={placeName} />
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
  return <RootLayout>{page}</RootLayout>;
};

export default PlacePage;
