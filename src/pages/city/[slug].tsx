import { useUser } from "@clerk/nextjs";
import type { GetStaticProps } from "next";
import Head from "next/head";
import { useState, type ReactElement } from "react";
import { api } from "~/utils/api";

import AddIcon from "public/icons/add";
import { ImageGrid, Modal, RootLayout, Searchbar } from "~/components";
import CityLaunch from "~/components/cityLaunch";
import { type ModalName } from "~/components/modal/utils";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { type NextPageWithLayout } from "~/types/pages";
import { findAverageRecDays } from "~/utils/common";

const CityPage: NextPageWithLayout<{ cityName: string }> = ({ cityName }) => {
  const { isSignedIn, user } = useUser();
  const [openModal, setOpenModal] = useState(false);
  const [showCityLaunch, setShowCityLaunch] = useState(false);
  const [modalContent, setModalContent] = useState<ModalName>("LoginModal");
  const [filterInputValue, setFilterInputValue] = useState("");
  const [isMutating, setIsMutating] = useState(false); // keep track of whether we're mutating data

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

  const visitedCityHandler = () => {
    setModalContent(isSignedIn ? "VisitedCityForm" : "LoginModal");
    setOpenModal(true);
  };

  console.log("cityData", cityData);

  return (
    <div className="flex w-full flex-col items-center">
      <Head>
        <title>{`${cityData.name} - TravelPerfect`}</title>
      </Head>

      {/* City Details */}
      <div className="flex w-full max-w-6xl flex-col justify-center px-5">
        <div className="relative flex w-full items-center justify-center">
          {/* City Name */}
          <h1 className="my-4 text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
            {cityData.name}
          </h1>

          {/* Show CityLaunch component */}
          <button
            className="absolute right-0"
            onClick={() => setShowCityLaunch(true)}
          >
            <AddIcon />
          </button>
        </div>

        {/* City Description */}
        <p className="mb-2 text-center text-lg font-normal text-gray-500 dark:text-gray-400 sm:px-16 lg:text-xl xl:px-48">
          {cityData.description}
        </p>
      </div>

      {/* Recommended time in city */}
      <p className="text-center text-amber-600">
        {allCityRecs?.length
          ? `Travelers recommend spending ${averageRecDays} in ${cityData.name}`
          : "No recommendations yet"}
      </p>

      {/* Been to this city? Open modal */}
      <div className="flex justify-center">
        <p
          className="text-center text-blue-500 hover:cursor-pointer"
          onClick={visitedCityHandler}
        >{`Been to ${cityData.name}? Click here!`}</p>
      </div>

      {/* Filter attraction name */}
      <div className="flex w-full justify-center ">
        <Searchbar
          inputValue={filterInputValue}
          setInputValue={setFilterInputValue}
        />
      </div>

      {/* CityLaunch */}
      {showCityLaunch && (
        <CityLaunch
          cityData={cityData}
          setShowCityLaunch={setShowCityLaunch}
          isMutating={isMutating}
        />
      )}

      {!showCityLaunch && (
        <ImageGrid
          cityData={cityData}
          userUpvoteData={userUpvoteData}
          filterInputValue={filterInputValue}
          setIsMutating={setIsMutating}
        />
      )}

      <Modal
        content={modalContent}
        data={cityData}
        openModal={openModal}
        setOpenModal={setOpenModal}
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

CityPage.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default CityPage;
