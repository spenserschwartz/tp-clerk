import { useState } from "react";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useUser } from "@clerk/nextjs";

import { api } from "~/utils/api";
import { findAverageRecDays } from "~/utils/common";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";

import { ImageGrid } from "~/components";
import Searchbar from "~/components/searchbar";
import Modal from "~/components/modal";

const CityPage: NextPage<{ cityName: string }> = ({ cityName }) => {
  const { user } = useUser();
  const [openModal, setOpenModal] = useState(false);
  const [filterInputValue, setFilterInputValue] = useState("");
  const { data: cityData } = api.city.getCityByName.useQuery({
    name: cityName,
  });

  if (!cityData) return <div>404 City Not Found</div>;

  const { data: userUpvoteData } = api.upvotes.getAllByUserInCity.useQuery({
    cityId: cityData.id,
    userId: user ? user.id : "",
  });
  const { data: allCityRecs } = api.recommendedDaysInCity.getAllByCity.useQuery(
    {
      cityName: cityData.name,
    }
  );

  const averageRecDays = findAverageRecDays(allCityRecs);

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
      {/* Recommended time in city */}
      <p className="text-center text-amber-600">
        {allCityRecs?.length
          ? `Travelers recommend spending ${averageRecDays} in ${cityData.name}`
          : "No recommendations yet"}
      </p>

      {/* Been to this city? Open modal */}
      <p
        className="text-center text-blue-500 hover:cursor-pointer"
        onClick={() => setOpenModal(true)}
      >{`Been to ${cityData.name}? Click here!`}</p>

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

      <Modal openModal={openModal} setOpenModal={setOpenModal} />
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
