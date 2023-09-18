import { useState } from "react";
import type { GetStaticProps, NextPage } from "next";
import { useUser } from "@clerk/nextjs";

import { api } from "~/utils/api";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";

import { ImageGrid } from "~/components";
import Searchbar from "~/components/searchbar";
import Head from "next/head";
import { displayCityName } from "~/utils/common";

const CityPage: NextPage<{ cityName: string }> = ({ cityName }) => {
  const { user } = useUser();
  const [filterInputValue, setFilterInputValue] = useState("");
  const { data: cityData } = api.city.getCityByName.useQuery({
    name: cityName,
  });

  if (!cityData) return <div>404 City Not Found</div>;

  console.log("cityData", cityData);

  const { data: userUpvoteData } = api.upvotes.getAllByUserInCity.useQuery({
    cityId: cityData.id,
    userId: user ? user.id : "",
  });

  // const allUpvotes = api.upvotes.getAll.useQuery(); // works
  // const utils = api.useContext();

  // const upvoteCreate = api.upvotes.create.useMutation({
  //   async onMutate(newUpvote) {
  //     // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
  //     await utils.upvotes.getAll.cancel();

  //     // Get data from queryCache
  //     const prevData = utils.upvotes.getAll.getData();

  //     // Optimistically update to the new value
  //     utils.upvotes.getAll.setData(undefined, (old) => [...old, newUpvote]);

  //     // Return the previous data if something goes wrong
  //     return { prevData };
  //   },
  //   onError(err, newPost, ctx) {
  //     // If the mutation fails, use the context-value from onMutate
  //     utils.upvotes.getAll.setData(undefined, ctx?.prevData);
  //   },
  //   onSettled() {
  //     // Sync with server once mutation has settled
  //     void utils.upvotes.getAll.invalidate();
  //   },
  // });

  return (
    <div className="px-2">
      <Head>
        <title>{`${cityData.name} - TravelPerfect`}</title>
      </Head>
      <h1 className="my-4 text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        {cityData.name}
      </h1>
      <p className="mb-2 text-center text-lg font-normal text-gray-500 dark:text-gray-400 sm:px-16 lg:text-xl xl:px-48">
        {cityData.description}
      </p>
      <div className="flex w-full justify-center ">
        <Searchbar
          inputValue={filterInputValue}
          setInputValue={setFilterInputValue}
        />
      </div>

      <ImageGrid
        cityData={cityData}
        userUpvoteData={userUpvoteData}
        filterInputValue={filterInputValue}
      />
    </div>
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
