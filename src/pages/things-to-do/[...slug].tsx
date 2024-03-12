import type { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useEffect, type ReactElement } from "react";
import { Table } from "~/components";

import { RootLayout } from "~/components/layout";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { type NextPageWithLayout } from "~/types/pages";
import { api } from "~/utils/api";

interface ThingsToDoPageStaticProps {
  query: string;
}

const ThingsToDoPage: NextPageWithLayout<ThingsToDoPageStaticProps> = (
  props
) => {
  const router = useRouter();
  console.log("router query", router.query);
  console.log("ThingsToDo props", props);
  const { query } = props;
  const { mutate, data: prominentPlacesData } =
    api.google.searchProminentPlacesByLocationNew.useMutation({});
  const { data: searchByTextData } = api.google.searchByTextForCity.useQuery(
    {
      query,
    },
    { refetchOnMount: false, refetchOnWindowFocus: false }
  );

  console.log("searchByTextData", searchByTextData);
  console.log("prominentPlacesData", prominentPlacesData);
  const prominentPlaces = prominentPlacesData?.places;

  // Fetch prominent places by location once the searchByTextData is available
  useEffect(() => {
    if (searchByTextData && !("error" in searchByTextData)) {
      const placeResult = searchByTextData?.results[0];
      const latitude = placeResult?.geometry?.location?.lat ?? 0;
      const longitude = placeResult?.geometry?.location?.lng ?? 0;

      console.log("latitude", latitude);
      mutate({ latitude, longitude, radius: 50000 });
    }
  }, [searchByTextData, mutate]);

  return (
    <div className="flex w-full">
      <Table places={prominentPlaces} />
    </div>
  );
};

export default ThingsToDoPage;

ThingsToDoPage.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export const getStaticProps: GetStaticProps = (context) => {
  const ssg = generateSSGHelper();
  const slug = context.params?.slug;
  // Catch-all segments ([...slug]) should always be an array
  if (!Array.isArray(slug)) throw new Error("no slug");

  // Make query for Google SearchByText API
  const query: string = slug.reverse().join(" ");
  //   await ssg.google.searchByTextForCity.prefetch({ query });

  return { props: { trpcState: ssg.dehydrate(), query } };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};
