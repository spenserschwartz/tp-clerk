import type { GetStaticProps, NextPage } from "next";
import ImageGrid from "~/components/imageGrid";
import { PageLayout } from "~/components/layout";

import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { api } from "~/utils/api";
import { displayCityName } from "~/utils/common";

const CityPage: NextPage<{ cityName: string }> = ({ cityName }) => {
  const { data: cityData } = api.city.getCityByName.useQuery({
    name: cityName,
  });
  const attractions = cityData?.attractions;

  const { data: allAttractions } = api.attractions.getAll.useQuery();
  console.log("cityData", cityData);
  console.log("attractionsData", allAttractions);

  const { data: londonData } = api.attractions.getAttractionsByCity.useQuery({
    name: cityName,
  });
  console.log("londonData", londonData);

  if (!cityData) return <div>404 City Not Found</div>;

  return (
    <PageLayout>
      <h1>{displayCityName(cityName)}</h1>
      <h2>Top Attractions</h2>
      <ul>
        {attractions?.map((attraction) => (
          <li key={attraction.id}>{attraction.name}</li>
        ))}
      </ul>
      <ImageGrid />
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
