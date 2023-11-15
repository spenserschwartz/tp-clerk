import { type GetStaticProps } from "next";
import React, { type ReactElement } from "react";
import { RootLayout } from "~/components";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { type NextPageWithLayout } from "~/types/pages";
import { api } from "~/utils/api";

const UserPage: NextPageWithLayout<{ userId: string }> = ({ userId }) => {
  console.log("userId", userId);

  const { data } = api.itinerary.getByUserId.useQuery({ userId });

  console.log("data", data);

  return <div>UserPage</div>;
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
