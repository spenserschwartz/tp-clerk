import type { GetStaticProps, NextPage } from "next";

import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { api } from "~/utils/api";

const CityPage: NextPage<{ cityName: string }> = ({ cityName }) => {
  const { data } = api.city.getCityByName.useQuery({
    name: cityName,
  });

  console.log("cityName", data);

  if (!data) return <div>404 City Not Found</div>;

  return <div>{`City Page: ${cityName}`}</div>;
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();

  const slug = context.params?.slug;

  if (typeof slug !== "string") throw new Error("no slug");

  const cityName = slug.replace("@", "");

  //   await ssg.profile.getUserByUsername.prefetch({ username });
  await ssg.city.getCityByName.prefetch({ name: cityName });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      cityName,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default CityPage;
