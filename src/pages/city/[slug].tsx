import type { GetStaticProps, NextPage } from "next";
import ImageGrid from "~/components/imageGrid";
import { PageLayout } from "~/components/layout";

import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { api } from "~/utils/api";

import { useUser } from "@clerk/nextjs";
import CreateUserWizard from "~/components/createUserWizard";

const CityPage: NextPage<{ cityName: string }> = ({ cityName }) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const { data: cityData } = api.city.getCityByName.useQuery({
    name: cityName,
  });

  const { data: userData } = api.users.getAll.useQuery();
  console.log("uD", userData);

  if (!cityData) return <div>404 City Not Found</div>;

  console.log("City User", user);

  return (
    <PageLayout>
      <h1 className="mb-4 text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        {cityData.name}
      </h1>
      <p className="mb-6 text-center text-lg font-normal text-gray-500 dark:text-gray-400 sm:px-16 lg:text-xl xl:px-48">
        {cityData.description}
      </p>

      <ImageGrid cityData={cityData} />

      <CreateUserWizard />
    </PageLayout>
  );
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
