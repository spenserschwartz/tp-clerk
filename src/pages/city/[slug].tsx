import { useUser } from "@clerk/nextjs";
import type { GetStaticProps } from "next";
import Head from "next/head";
import { useState, type ReactElement } from "react";
import toast from "react-hot-toast";
import { api } from "~/utils/api";

import AddIcon from "public/icons/add";
import {
  ImageGrid,
  Itinerary,
  LoadingSection,
  Modal,
  RootLayout,
  Searchbar,
} from "~/components";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { type ParsedAIMessageInterface } from "~/types";
import { type NextPageWithLayout } from "~/types/pages";
import { findAverageRecDays } from "~/utils/common";
import useCreateItinerary from "~/utils/hooks/useCreateItinerary";

const CityPage: NextPageWithLayout<{ cityName: string }> = ({ cityName }) => {
  const { isSignedIn, user } = useUser();
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [filterInputValue, setFilterInputValue] = useState("");
  const [parsedData, setParsedData] = useState<ParsedAIMessageInterface[]>([]);
  const { data: cityData } = api.city.getCityByName.useQuery({
    name: cityName,
  });
  const { createItinerary, isCreatingItinerary } = useCreateItinerary();

  if (!cityData) return <div>404 City Not Found</div>;

  const { mutate: generateAI, isLoading: isLoadingAI } =
    api.openAI.generateTripItinerary.useMutation({});

  const { data: userUpvoteData } = api.upvotes.getAllByUserInCity.useQuery({
    cityId: cityData.id,
    userId: user ? user.id : "",
  });
  const { data: allCityRecs } = api.recommendedDaysInCity.getAllByCity.useQuery(
    {
      cityName: cityData.name,
    }
  );

  const attractionsUpvotedByUser: string[] | undefined = userUpvoteData?.map(
    (upvote) => upvote.attraction.name
  );
  const averageRecDays = findAverageRecDays(allCityRecs);

  const visitedCityHandler = () => {
    setModalContent(isSignedIn ? "VisitedCityForm" : "LoginModal");
    setOpenModal(true);
  };

  const makeItineraryHandler = () => {
    generateAI(
      {
        cityName: cityData.name,
        startDate: "2021-09-01",
        endDate: "2021-09-03",
        attractions: attractionsUpvotedByUser ?? [],
      },
      {
        onSettled(data, error) {
          if (error) toast.error("Failed to generate itinerary!");
          if (data) {
            const newParsedData = JSON.parse(
              data?.choices[0]?.message.content ?? ""
            ) as ParsedAIMessageInterface[];

            setParsedData(newParsedData);
            createItinerary({ cityId: cityData.id, details: newParsedData });
          }
        },
      }
    );
  };

  return (
    <div className="flex w-full flex-col items-center px-2 pt-16">
      <Head>
        <title>{`${cityData.name} - TravelPerfect`}</title>
      </Head>

      {/* City Details */}
      <div className="flex w-full max-w-6xl flex-col justify-center px-5">
        <div className="relative flex w-full items-center justify-center ">
          {/* City Name */}
          <h1 className="my-4 text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
            {cityData.name}
          </h1>

          {/* Make Itinerary Button */}
          <button className="absolute right-0" onClick={makeItineraryHandler}>
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

      {/* City Itinerary */}
      <div className="my-8 flex h-full flex-col items-center">
        {/* Loading Page */}
        {(isLoadingAI || isCreatingItinerary) && <LoadingSection />}
        <Itinerary parsedData={parsedData} />
      </div>

      <ImageGrid
        cityData={cityData}
        userUpvoteData={userUpvoteData}
        filterInputValue={filterInputValue}
      />

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
