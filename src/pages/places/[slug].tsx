import type { GetStaticProps } from "next";
import React, { type ReactElement } from "react";
import { type NextPageWithLayout } from "~/types/pages";

import { RootLayout } from "~/components";
import { slugToDatabaseName } from "~/lib/utils";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { api } from "~/utils/api";

const PlacePage: NextPageWithLayout<{ placeName: string }> = ({
  placeName,
}) => {
  const { data } = api.attractions.getByName.useQuery({
    name: slugToDatabaseName(placeName),
  });

  console.log("placePage data", data);

  return <div>PlacePage</div>;
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();

  const slug = context.params?.slug;

  if (typeof slug !== "string") throw new Error("no slug");

  const placeName = slug.replace("@", "");
  const databaseName = slugToDatabaseName(placeName);

  console.log("placeName: ", placeName);
  console.log("display name", databaseName);

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
